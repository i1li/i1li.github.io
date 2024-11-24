require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const path = require('path');
const serv = express();
const { exec } = require('child_process');
const isDev = process.argv.includes('dev');
const staticDir = isDev ? 'src' : 'dist';
serv.use(express.static(path.join(__dirname, staticDir)));
serv.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, staticDir, 'index.html'));
    new URL(req.url, `http://${req.headers.host}`);
});
serv.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${isDev ? 'development' : 'production'} mode - \x1b[34mhttp://localhost:${PORT}/\x1b[0m`);
    openBrowser(`http://localhost:${PORT}/`);
});
function openBrowser(url) {
    switch (process.platform) {
        case 'darwin':
            exec(`open ${url}`);
            break;
        case 'win32':
            exec(`start ${url}`);
            break;
        default:
            exec(`xdg-open ${url}`);
    }
}
