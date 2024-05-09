const express = require('express');
const serv = express();
const path = require('path');
const { exec } = require('child_process');
const PORT = process.env.PORT || 5000;
serv.use(express.static(path.join(__dirname)));
serv.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
serv.get('*', (req, res) => {
    new URL(req.url, `http://${req.headers.host}`);
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            res.status(404).send('404 Not Found');
        }
    });
});
serv.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - \x1b[34mhttp://localhost:${PORT}/\x1b[0m`);
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