const fs = require('fs');
const path = require('path');
const axios = require("axios");
const KEY = ""; // https://developers.google.com/youtube/v3/getting-started#before-you-start
const indexHtmlPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const musicDivRegex = /id="musix">([\s\S]*?)<\/div>/;
const extraDivRegex = /id="extra">([\s\S]*?)<\/div>/;
const videoIdRegex = /v="([^"?]*?)"/g;
const playlistIdRegex = /(?:p="(PL[^"]*?|FL[^"]*?|OL[^"]*?|TL[^"]*?)"|v="(PL[^"]*?|FL[^"]*?|OL[^"]*?|TL[^"]*?)")/g;
const noEmbedRegex = /"no-embeds"[^>]*>([^<]*)<\/div>/;
const musicDiv = indexHtml.match(musicDivRegex)?.[1] || '';
const extraDiv = indexHtml.match(extraDivRegex)?.[1] || '';
const searchDivs = musicDiv + extraDiv;
const noEmbedIds = indexHtml.match(noEmbedRegex)?.[1].trim().split(',') || [];
const extractIds = (regex, source) => {
  const ids = [];
  let match;
  while ((match = regex.exec(source)) !== null) {
    if (match[1]) {
      ids.push(match[1]);
    } else if (match[2]) {
      ids.push(match[2]);
    }
  }
  return ids;
};
const videoIds = extractIds(videoIdRegex, searchDivs);
const playlistIds = extractIds(playlistIdRegex, searchDivs);
let match;
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
        }
      const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
      url.search = new URLSearchParams(params).toString();
      url.href = url.href.replace(/&pageToken=null/, '');
      console.log(`Sending request to: ${url}`);
      const result = await axios.get(url.toString(), {
        params,
      });
      const availableVideos = result.data.items.filter((item) => item.status.privacyStatus === 'public');
      videoIds = [...videoIds, ...availableVideos.map((item) => item.snippet.resourceId.videoId)];
      totalItems += result.data.items.length;
      console.log(`Fetched ${totalItems} items for playlist ID: ${playlistID}`);
      pageToken = result.data.nextPageToken;
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
const getVideoDetails = async (videoIDs) => {
  let availableVideoIds = [];
  for (const videoID of videoIDs) {
    try {
      let pageToken = null;
      do {
        const params = {
          part: 'id,snippet,status',
          maxResults: 50,
          id: videoID.trim(),
          key: KEY,
          pageToken: pageToken,
        }
        const url = new URL('https://www.googleapis.com/youtube/v3/videos');
        url.search = new URLSearchParams(params).toString();
        url.href = url.href.replace(/&pageToken=null/, '');
        const result = await axios.get(url.toString(), {
          params,
        });
      const availableVideos = result.data.items.filter(item => item.status.privacyStatus === 'public');
      availableVideoIds = [...availableVideoIds, ...availableVideos.map(item => item.id)];
      pageToken = result.data.nextPageToken;
       } while (pageToken);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`Skipping invalid video ID: ${videoID}`);
      } else {
        console.error(`Error fetching video details for video ID ${videoID}: ${error.message}`);
      }
    }
  }
  return availableVideoIds;
};
const writeOutput = async () => {
  const [playlistVideoIds, availableVideoIds] = await Promise.all([
    getPlaylistItems(playlistIds),
    getVideoDetails(videoIds)
  ]);
  const combinedVideoIds = [...new Set([...availableVideoIds, ...Object.values(playlistVideoIds).flat()])].filter(id => !noEmbedIds.includes(id));
  let modifiedHtml = indexHtml;
  for (const playlistId of playlistIds) {
    const videoIdsInPlaylist = playlistVideoIds[playlistId] || [];
    const ytRegex = new RegExp(`<y-t[^>]*?(?:p="${playlistId}"|v="${playlistId}")[^>]*?>`, 'g');
    modifiedHtml = modifiedHtml.replace(ytRegex, (match) => {
      if (match.includes(`p="${playlistId}"`)) {
        return match.replace(/p="[^"]*?"/, `p="${playlistId}"`).replace(/v="[^"]*?"/, `v="${videoIdsInPlaylist.join(',')}"`);
      } else {
        return match.replace(/v="[^"]*?"/, `p="${playlistId}" v="${videoIdsInPlaylist.join(',')}"`);
      }
    });
  }
  const combinedListRegex = /"combined-list"[^>]*>[\s\S]*?<\/y-t>/;
  const finalIndexHtml = modifiedHtml.replace(
    combinedListRegex,
    `"combined-list"><y-t class="no-link-embed" v="${combinedVideoIds}" t="Combined Shuffled Playlist"></y-t>`
  );
  fs.writeFileSync(path.join(__dirname, 'index.html'), finalIndexHtml);
};
writeOutput().catch(console.error);
