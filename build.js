const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio'); // npm install cheerio

let html = fs.readFileSync('src/index.html', 'utf8');
const itemsToCopy = ['favicon.ico', 'img'];
const cacheBuster = () => crypto.randomBytes(3).toString('hex').slice(0, 5);
const uniqueHash = cacheBuster();
const addComment = (content, fileType) => {
    const comment = "Hello and God bless! Christ is King! https://github.com/i1li/i";
    switch(fileType) {
        case 'html':
            return `<!-- ${comment} -->\n${content}\n`;
        case 'js':
            return `// ${comment}\n${content}\n`;
        case 'css':
            return `/* ${comment} */\n${content}\n`;
        default:
            return content;
    }
};
const scriptRegex = /<script\s+src\s*=\s*["'](.+?)["']\s*>/gi;
const linkRegex = /<link\s+rel\s*=\s*["']stylesheet["']\s+(?:type\s*=\s*["']text\/css["']\s+)?href\s*=\s*["'](.+?)["']\s*>/gi;
const resolvePath = (filePath) => {
    if (filePath.startsWith('/') && !filePath.startsWith('/bundle')) {
        return path.join(__dirname, 'src', filePath.slice(1));
    }
    return path.join(__dirname, 'src', filePath);
};
const jsFiles = [...html.matchAll(scriptRegex)].map(match => resolvePath(match[1]));
const cssFiles = [...html.matchAll(linkRegex)].map(match => resolvePath(match[1]));

if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');

// NEW: Process links in HTML at build time
const $ = cheerio.load(html);
$('a').each((i, el) => {
  const href = $(el).attr('href');
  if (!href) return; // Skip anchors without href

  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
    // External: Add target/rel
    $(el).attr('target', '_blank');
    $(el).attr('rel', 'noreferrer');
  } else {
    // Local: Add onclick with navigate call (assumes href starts with /)
    const path = href.startsWith('/') ? href.substring(1) : href;
    const escapedPath = path.replace(/'/g, "\\'"); // Escape for JS string
    $(el).attr('onclick', `navigateSPA(event, '${escapedPath}')`); // Pass event explicitly
  }
});
html = $.html(); // Update html with modifications

async function bundleJS() {
    let concatenatedJS = '';
    for (const file of jsFiles) {
        const result = await esbuild.build({
            entryPoints: [file],
            bundle: false,
            minify: true,
            write: false,
        });
        concatenatedJS += result.outputFiles[0].text.trim();
    }
    concatenatedJS = concatenatedJS.replace(/\s+/g, ' ');
    concatenatedJS = addComment(concatenatedJS, 'js');
    fs.writeFileSync(`dist/bundle-${uniqueHash}.js`, concatenatedJS);
}
async function bundleCSS() {
    let concatenatedCSS = '';
    for (const file of cssFiles) {
        const result = await esbuild.build({
            entryPoints: [file],
            bundle: false,
            minify: true,
            write: false,
        });
        concatenatedCSS += result.outputFiles[0].text.trim();
    }
    concatenatedCSS = addComment(concatenatedCSS, 'css');
    fs.writeFileSync(`dist/bundle-${uniqueHash}.css`, concatenatedCSS);
}
Promise.all([bundleJS(), bundleCSS()])
    .then(() => {
        html = html.replace(/<script.*?<\/script>/g, '');
        html = html.replace('</body>', `<script src="/bundle-${uniqueHash}.js"></script></body>`);
        html = html.replace(/<link.*?stylesheet.*?>/g, '');
        html = html.replace('</head>', `<link rel="stylesheet" href="/bundle-${uniqueHash}.css"></head>`);
        html = html.replace(/\s+/g, ' ');
        html = addComment(html, 'html');
        fs.writeFileSync('dist/index.html', html);
        fs.writeFileSync('dist/404.html', html);
        console.log('Build complete');
    })
    .catch((error) => {
        console.error('Build failed:', error);
        process.exit(1);
    });
const copyFilesAndDirs = (itemsToCopy) => {
    itemsToCopy.forEach(item => {
        const sourcePath = path.join(__dirname, 'src', item);
        const destPath = path.join(__dirname, 'dist', item);
        if (fs.existsSync(sourcePath)) {
            if (fs.lstatSync(sourcePath).isDirectory()) {
                fs.mkdirSync(destPath, { recursive: true });
                fs.readdirSync(sourcePath).forEach(file => {
                    const srcFile = path.join(sourcePath, file);
                    const destFile = path.join(destPath, file);
                    fs.copyFileSync(srcFile, destFile);
                });
            } else {
                fs.copyFileSync(sourcePath, destPath);
            }
            console.log(`Copied: ${item} to /dist`);
        } else {
            console.warn(`Warning: ${item} does not exist and was not copied.`);
        }
    });
};
copyFilesAndDirs(itemsToCopy);
