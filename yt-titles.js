const fs = require('fs');
const axios = require('axios');
async function fetchTitle(videoId) {
  const response = await axios.get(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId.split('?')[0]}`);
  const data = response.data;
  return data.title;
}
async function updateTitles() {
  const htmlFilePath = 'index.html';
  let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  const regex = /<y-t\s+v="([^"]+)"(?:(?!t).)*?>/g;
  let matches = [...htmlContent.matchAll(regex)];
  const replacements = await Promise.all(matches.map(async match => {
    const videoId = match[1];
    const title = await fetchTitle(videoId);
    let newTag = `<y-t`;
    const existingAttributes = match[0].match(/\w+="[^"]*"/g);
    existingAttributes.forEach(attr => {
      newTag += ` ${attr}`;
    });
    if (match[0].includes('t="')) {
      const existingTitle = match[0].match(/t="([^"]*)"/)[1];
      if (existingTitle) {
        newTag += ` t="${existingTitle}"`;
      } else {
        newTag += ` t="${title}"`;
      }
    } else {
      newTag += ` t="${title}"`;
    }
    newTag += '>';
    return {
      old: match[0],
      new: newTag
    };
  }));
  replacements.forEach(replacement => {
    htmlContent = htmlContent.replace(replacement.old, replacement.new);
  });
  fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
}
updateTitles().then(() => console.log('Titles updated.'));
