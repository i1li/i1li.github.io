const KEY = ""; // https://developers.google.com/youtube/v3/getting-started#before-you-start
const fs = require('fs');
const https = require('https');
let htmlContent = fs.readFileSync('index.html', 'utf8');
const musicDivRegex = /id="musix">([\s\S]*?)<\/div>/;
const extraDivRegex = /id="extra">([\s\S]*?)<\/div>/;
const playlistIdRegex = /(?:p="(PL[^"]{12,}|FL[^"]{12,}|OL[^"]{12,}|TL[^"]{12,}|UU[^"]{12,})(?!,)"|v="(PL[^"]{12,}|FL[^"]{12,}|OL[^"]{12,}|TL[^"]{12,}|UU[^"]{12,})(?!,)")/g;
const noEmbedRegex = /"no-embeds"[^>]*>([^<]*)<\/div>/;
const musicDiv = htmlContent.match(musicDivRegex)?.[1] || '';
const extraDiv = htmlContent.match(extraDivRegex)?.[1] || '';
const searchDivs = musicDiv + extraDiv;
const noEmbedIds = htmlContent.match(noEmbedRegex)?.[1].trim().split(',') || [];
let match;
const extractIds = (regex, source) => {
  const ids = [];
  while ((match = regex.exec(source)) !== null) {
    if (match[1] && !match[1].includes(',')) {
      ids.push(match[1]);
    } else if (match[2] && !match[2].includes(',')) {
      ids.push(match[2]);
    }
  }
  return ids;
};
const playlistIds = extractIds(playlistIdRegex, searchDivs);
while ((match = playlistIdRegex.exec(musicDiv)) !== null) {
  if (match[1] && match[1].length > 11) {
    playlistIds.push(match[1]);
  } else if (match[2] && match[2].length > 11) {
    playlistIds.push(match[2]);
  }
}
const getPlaylistItems = async (playlistIDs) => {
  let availableVideoIds = {};
  for (const playlistID of playlistIDs) {
    try {
      console.log(`Fetching playlist items for playlist ID: ${playlistID}`);
      let pageToken = null;
      let totalItems = 0;
      let videoIds = [];
      do {
        const params = {
          part: 'id,snippet,status',
          maxResults: 50,
          playlistId: playlistID.trim(),
          key: KEY,
          pageToken: pageToken,
        };
        const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
        url.search = new URLSearchParams(params).toString();
        url.href = url.href.replace(/&pageToken=null/, '');
        const result = await new Promise((resolve, reject) => {
          https.get(url.toString(), (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              resolve(JSON.parse(data));
            });
          }).on('error', (err) => {
            reject(err);
          });
        });
        const availableVideos = result.items.filter((item) => item.status.privacyStatus === 'public' && !noEmbedIds.includes(item.snippet.resourceId.videoId));
        videoIds = [...videoIds, ...availableVideos.map((item) => item.snippet.resourceId.videoId)];
        totalItems += result.items.length;
        console.log(`Fetched ${totalItems} items for playlist ID: ${playlistID}`);
        pageToken = result.nextPageToken;
      } while (pageToken);
      availableVideoIds[playlistID] = videoIds;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`Skipping invalid playlist ID: ${playlistID}`);
      } else {
        console.error(`Error fetching playlist items for playlist ID ${playlistID}: ${error.message}`);
      }
    }
  }
  return availableVideoIds;
};
const writeOutput = async () => {
  const [playlistVideoIds] = await Promise.all([
    getPlaylistItems(playlistIds),
  ]);
  for (const playlistId of playlistIds) {
    const videoIdsInPlaylist = playlistVideoIds[playlistId] || [];
    const ytRegex = new RegExp(`<y-t[^>]*?(?:p="${playlistId}"|v="${playlistId}")[^>]*?>`, 'g');
    htmlContent = htmlContent.replace(ytRegex, (match) => {
      if (match.includes(`p="${playlistId}"`)) {
        if (playlistId.includes(',')) {
          return match;
        }
        return match.replace(/p="[^"]*?"/, `p="${playlistId}"`).replace(/v="[^"]*?"/, `v="${videoIdsInPlaylist.join(',')}"`);
      } else {
        return match.replace(/v="[^"]*?"/, `p="${playlistId}" v="${videoIdsInPlaylist.join(',')}"`);
      }
    });
  }
  fs.writeFileSync('index.html', htmlContent, 'utf8');
};
writeOutput().catch(console.error);
