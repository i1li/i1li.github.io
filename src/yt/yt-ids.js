require('dotenv').config();
const KEY = process.env.KEY;
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const https = require('https');
if (!KEY) throw new Error('API key missing');
const fetchUrl = url => new Promise((resolve, reject) => {
  https.get(url.toString(), res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => resolve(JSON.parse(data)));
  }).on('error', reject);
});
const buildUrl = (base, params) => {const u = new URL(base);
  u.search = new URLSearchParams(params); return u; };
const extractIds = (regex, src) => {
  const out = [];
  let m;
  while ((m = regex.exec(src))) {
    if (m[1]) out.push(...m[1].split(',').map(s => s.trim()));
  }
  return out;
};
const htmlContent = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const searchDiv = htmlContent.match(/id="shuffle">([\s\S]*?)<\/div>/)?.[1] || '';
const allIds = extractIds(/(?:p|v)="([^"]+)"/g, searchDiv);
const cleanId = id => id.split('?')[0];
const isVideoId = id => cleanId(id).length === 11;
const isPlaylistId = id => cleanId(id).length > 11;
const playlistIds = allIds.filter(isPlaylistId);
const videoIds = allIds.filter(isVideoId);
const excludedIds = new Set(
  readFileSync(join(__dirname, '..', 'yt', 'exclude.txt'), 'utf8')
    .split(',').map(id => id.trim()).filter(Boolean)
);
const writeOutput = async () => {
  const playlistVideos = {};
  let playlistErrors = 0;
  for (const raw of playlistIds) {
    const pid = cleanId(raw);
    let pageToken = null;
    const ids = [];
    do {
      try {
        const params = {
          part: 'snippet,status',
          playlistId: pid,
          maxResults: 50,
          key: KEY
        };
        if (pageToken) params.pageToken = pageToken;
        const data = await fetchUrl(buildUrl('https://www.googleapis.com/youtube/v3/playlistItems', params));
        if (data.error) throw new Error(data.error.message);
        for (const item of data.items) {
          if (
            item.status?.privacyStatus !== 'private' &&
            !excludedIds.has(item.snippet.resourceId.videoId)
          ) {
            ids.push(item.snippet.resourceId.videoId);
          }
        }
        pageToken = data.nextPageToken || null;
      } catch (e) {
        playlistErrors++;
        console.error(`Playlist ${pid}: ${e.message}`);
        break;
      }
    } while (pageToken);
    playlistVideos[pid] = ids;
  }
  const allCleanIds = [...new Set([
    ...videoIds.map(cleanId),
    ...Object.values(playlistVideos).flat()
  ])].filter(id => !excludedIds.has(id));
  const infoMap = {};
  let videoErrors = 0;
  for (let i = 0; i < allCleanIds.length; i += 50) {
    const batch = allCleanIds.slice(i, i + 50);
    try {
      const data = await fetchUrl(buildUrl('https://www.googleapis.com/youtube/v3/videos', {
        part: 'status,contentDetails',
        id: batch.join(','),
        key: KEY
      }));
      if (data.error) throw new Error(data.error.message);
      for (const item of data.items || []) {
        if (item.status?.privacyStatus === 'private') continue;
        const durationSeconds = (()=>{const m=(item.contentDetails?.duration||'PT0S').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/); return ((+m?.[1]||0)*3600)+((+m?.[2]||0)*60)+(+m?.[3]||0);})();
        infoMap[item.id] = {
          embeddable: item.status.embeddable ?? null, durationSeconds
        };
      }
    } catch (e) {videoErrors++;console.error(`Videos batch error: ${e.message}`);}
  }
  const originalMap = new Map(allIds.map(id => [cleanId(id), id]));
  let total = 0;
  const updated = searchDiv.replace(/<y-t([^>]*)>/g, (_, attrs) => {
    const p_match = attrs.match(/p="([^"]*)"/);
    const v_match = attrs.match(/v="([^"]*)"/);
    const u_match = attrs.match(/u="([^"]*)"/);
    const p_split = p_match ? p_match[1].split(',').map(s => s.trim()).filter(Boolean) : [];
    const v_split = v_match ? v_match[1].split(',').map(s => s.trim()).filter(Boolean) : [];
    const u_split = u_match ? u_match[1].split(',').map(s => s.trim()).filter(Boolean) : [];
    const all_attr_ids = [...p_split, ...v_split];
    const playlist_full = all_attr_ids.filter(isPlaylistId);
    const video_full = all_attr_ids.filter(isVideoId);
    const fromPlaylists = playlist_full.map(full => playlistVideos[cleanId(full)] || []).flat();
    const v_clean = video_full.map(cleanId);
    const combinedClean = [...new Set([...fromPlaylists, ...v_clean])].filter(id => !excludedIds.has(id));
    const infoFilter = (id, condition) => {
      const info = infoMap[id];
      return info && condition(info.embeddable) && info.durationSeconds >= 150;
    };
    const embeddableClean = combinedClean.filter(id => infoFilter(id, emb => emb === true));
    const nonEmbeddableClean = combinedClean.filter(id => infoFilter(id, emb => emb === false || emb === null));
    total += embeddableClean.length + nonEmbeddableClean.length;
    const embeddableFull = embeddableClean.map(id => originalMap.get(id) || id);
    const nonEmbeddableFull = [...new Set([
      ...nonEmbeddableClean.map(id => originalMap.get(id) || id),
      ...u_split
    ])].filter(Boolean);
    const otherAttrs = attrs.replace(/[\s]*(p|v|u)="[^"]*"/g, '').trim();
    const attrParts = [];
    if (playlist_full.length > 0) attrParts.push(`p="${playlist_full.join(',')}"`);
    attrParts.push(`v="${embeddableFull.join(',')}"`);
    if (nonEmbeddableFull.length > 0) attrParts.push(`u="${nonEmbeddableFull.join(',')}"`);
    const newAttrs = [otherAttrs, ...attrParts].filter(Boolean).join(' ');
    return `<y-t${newAttrs ? ' ' + newAttrs.replace(/\s+/g, ' ') : ''}>`;
  });
  writeFileSync(join(__dirname, '..', 'index.html'),
    htmlContent
      .replace(/id="shuffle">[\s\S]*?<\/div>/, `id="shuffle">${updated}</div>`)
      .replace(/"total-videos">[^<]*<\/span>/, `"total-videos">${total.toLocaleString()}</span>`),
    'utf8'
  );
  console.log(`\nTotal videos processed: ${total.toLocaleString()}`);
  console.log(`Errors — playlists: ${playlistErrors}, videos: ${videoErrors}`);
};
writeOutput().catch(console.error);
