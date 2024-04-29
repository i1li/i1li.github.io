const fs = require('fs');
const path = require('path');
const axios = require("axios");
const KEY = ""; // https://developers.google.com/youtube/v3/getting-started#before-you-start
const indexHtmlPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const musicDivRegex = /id="musix">([\s\S]*?)<\/div>/;
const extraDivRegex = /id="extra">([\s\S]*?)<\/div>/;
const videoIdRegex = /v="([^"?]*?)"/g;
const playlistIdRegex = /v="(PL[^"]*?|FL[^"]*?|OL[^"]*?|TL[^"]*?)"/g;
const noEmbedRegex = /"no-embeds"[^>]*>([^<]*)<\/div>/;
const musicDiv = indexHtml.match(musicDivRegex)?.[1] || '';
const extraDiv = indexHtml.match(extraDivRegex)?.[1] || '';
const searchDivs = musicDiv + extraDiv;
const noEmbedIds = indexHtml.match(noEmbedRegex)?.[1].trim().split(',') || [];
const extractIds = (regex, source) => {
  const ids = [];
  let match;
  while ((match = regex.exec(source)) !== null) {
    ids.push(match[1]);
  }
  return ids;
};
const videoIds = extractIds(videoIdRegex, searchDivs);
const playlistIds = extractIds(playlistIdRegex, searchDivs);
let match;
while ((match = videoIdRegex.exec(musicDiv)) !== null) {
  if (match[1].length === 11) {
    videoIds.push(match[1]);
  }
}
while ((match = playlistIdRegex.exec(musicDiv)) !== null) {
  if (match[1].length > 11) {
    playlistIds.push(match[1]);
  }
}
const getPlaylistItems = async (playlistIDs) => {
  let availableVideoIds = {};
  for (const playlistID of playlistIDs) {
    try {
      const result = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
        params: {
          part: 'id,snippet,status',
          maxResults: 10000,
          playlistId: playlistID.trim(),
          key: KEY
        }
      });
      const availableVideos = result.data.items.filter(item => item.status.privacyStatus === 'public');
      availableVideoIds[playlistID] = availableVideos.map(item => item.snippet.resourceId.videoId);
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
      const result = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'id,snippet,status',
          id: videoID.trim(),
          key: KEY
        }
      });
      const availableVideos = result.data.items.filter(item => item.status.privacyStatus === 'public');
      availableVideoIds = [...availableVideoIds, ...availableVideos.map(item => item.id)];
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
    const videoIdsString = `p="${playlistId}" v="${videoIdsInPlaylist.join(',')}"`;
    modifiedHtml = modifiedHtml.replace(`v="${playlistId}"`, videoIdsString);
  }
  const combinedListRegex = /"combined-list"[^>]*>[\s\S]*?<\/y-t>/;
  const finalIndexHtml = modifiedHtml.replace(
    combinedListRegex,
    `"combined-list"><y-t class="no-link-embed" v="${combinedVideoIds}" t="Combined Shuffled Playlist"></y-t>`
  );
  fs.writeFileSync(path.join(__dirname, 'index.html'), finalIndexHtml);
};
writeOutput().catch(console.error);
