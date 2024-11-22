const fs = require('fs');
const path = require('path');

// Read the HTML file
let html = fs.readFileSync('index.html', 'utf8');

// Use regex to find all script and link tags
const scriptRegex = /<script\s+src\s*=\s*["'](.+?)["']\s*>/gi;
const linkRegex = /<link\s+rel\s*=\s*["']stylesheet["']\s+(?:type\s*=\s*["']text\/css["']\s+)?href\s*=\s*["'](.+?)["']\s*>/gi;

// Function to resolve paths
const resolvePath = (filePath) => {
    if (filePath.startsWith('/')) {
        return '.' + filePath; // Convert /js/file.js to ./js/file.js
    }
    return filePath; // Already relative, leave as is
};

const jsFiles = [...html.matchAll(scriptRegex)].map(match => resolvePath(match[1]));
const cssFiles = [...html.matchAll(linkRegex)].map(match => resolvePath(match[1]));

// Concatenate JS files
const concatenatedJS = jsFiles.map(file => fs.readFileSync(file, 'utf8').trim()).join('');
fs.writeFileSync('bundle.js', concatenatedJS);

// Concatenate CSS files
const concatenatedCSS = cssFiles.map(file => fs.readFileSync(file, 'utf8').trim()).join('');
fs.writeFileSync('bundle.css', concatenatedCSS);

// Update HTML
html = html.replace(/<script.*?<\/script>/g, '');
html = html.replace('</body>', '<script src="bundle.js"></script></body>');

html = html.replace(/<link.*?stylesheet.*?>/g, '');
html = html.replace('</head>', '<link rel="stylesheet" href="bundle.css"></head>');

// Write updated HTML
fs.writeFileSync('index.html', html);

// Delete original JS and CSS files
jsFiles.forEach(file => {
    try {
        fs.unlinkSync(file);
        console.log(`Deleted: ${file}`);
    } catch (err) {
        console.error(`Error deleting ${file}: ${err.message}`);
    }
});

cssFiles.forEach(file => {
    try {
        fs.unlinkSync(file);
        console.log(`Deleted: ${file}`);
    } catch (err) {
        console.error(`Error deleting ${file}: ${err.message}`);
    }
});

console.log('Concatenation complete, index.html updated, and original files deleted');
