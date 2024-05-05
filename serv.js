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
    if (req.path !== '/index.html') {
        res.status(404).sendFile(path.join(__dirname, '404.html'));
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
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
