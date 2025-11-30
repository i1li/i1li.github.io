require('dotenv').config();
const KEY = process.env.KEY;
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const https = require('https');
if (!KEY) throw new Error('API key missing');
const excludedIds = new Set(
  readFileSync(join(__dirname, '..', 'yt', 'exclude.txt'), 'utf8')
    .split(',').map(id => id.trim()).filter(Boolean)
);
const htmlContent = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const searchDiv = htmlContent.match(/id="shuffle">([\s\S]*?)<\/div>/)?.[1] || '';
const cleanId = id => id.split('?')[0];
const isVideoId   = id => cleanId(id).length === 11;
const isPlaylistId = id => cleanId(id).length > 11;
const fetchUrl = url => new Promise((resolve, reject) => {
  https.get(url.toString(), res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => resolve(JSON.parse(data)));
  }).on('error', reject);
});
const buildUrl = (base, params) => {
  const u = new URL(base);
  u.search = new URLSearchParams(params);
  return u;
};
const extractIds = (regex, src) => {
  const out = [];
  let m;
  while ((m = regex.exec(src))) {
    if (m[1]) out.push(...m[1].split(',').map(s => s.trim()));
    if (m[2]) out.push(...m[2].split(',').map(s => s.trim()));
  }
  return out;
};
const allIds = extractIds(/(?:p="([^"]+)"|v="([^"]+)")/g, searchDiv);
const playlistIds = allIds.filter(isPlaylistId);
const videoIds    = allIds.filter(isVideoId);
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
  const embeddableMap = {};
  let videoErrors = 0;
  for (let i = 0; i < allCleanIds.length; i += 50) {
    const batch = allCleanIds.slice(i, i + 50);
    try {
      const data = await fetchUrl(buildUrl('https://www.googleapis.com/youtube/v3/videos', {
        part: 'status',
        id: batch.join(','),
        key: KEY
      }));
      if (data.error) throw new Error(data.error.message);
      for (const item of data.items || []) {
        if (item.status?.privacyStatus === 'private') continue;
        embeddableMap[item.id] = item.status.embeddable ?? null;
      }
    } catch (e) {
      videoErrors++;
      console.error(`Videos batch error: ${e.message}`);
    }
  }
  const originalMap = new Map(allIds.map(id => [cleanId(id), id]));
  let total = 0;
  const updated = searchDiv.replace(/<y-t([^>]*)>/g, (_, attrs) => {
    const p = (attrs.match(/p="([^"]*)"/)?.[1] || '').split(',').map(s => s.trim()).filter(isPlaylistId);
    const v = (attrs.match(/v="([^"]*)"/)?.[1] || '').split(',').map(s => s.trim());
    const u = (attrs.match(/u="([^"]*)"/)?.[1] || '').split(',').map(s => s.trim()).filter(Boolean);
    const fromPlaylists = p.flatMap(pid => playlistVideos[cleanId(pid)] || []);
    const combinedClean = [...new Set([...fromPlaylists, ...v.map(cleanId)])]
      .filter(id => !excludedIds.has(id));
    const embeddableClean = combinedClean.filter(id => embeddableMap[id] === true);
    const nonEmbeddableClean = combinedClean.filter(id => embeddableMap[id] === false || embeddableMap[id] === null);
    total += embeddableClean.length + nonEmbeddableClean.length;
    const embeddableFull = embeddableClean.map(id => originalMap.get(id) || id);
    const nonEmbeddableFull = [...new Set([
      ...nonEmbeddableClean.map(id => originalMap.get(id) || id),
      ...u
])].filter(Boolean);
    let newAttrs = attrs
      .replace(/p="[^"]*"/g, p.length ? `p="${p.join(',')}"` : 'p=""')
      .replace(/v="[^"]*"/g, `v="${embeddableFull.join(',')}"`)
      .replace(/u="[^"]*"/g, '');
    if (nonEmbeddableFull.length>0) newAttrs += ` u="${nonEmbeddableFull.join(',')}"`;
    return `<y-t ${newAttrs.trim().replace(/\s+/g, ' ')}>`;
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