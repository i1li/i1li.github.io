const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

let htmlContent = fs.readFileSync('src/index.html', 'utf8');
const itemsToCopy = ['favicon.ico', 'img'];
const cacheBuster = Math.random().toString(36).slice(2, 8);
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
const jsFiles = [...htmlContent.matchAll(scriptRegex)].map(match => resolvePath(match[1]));
const cssFiles = [...htmlContent.matchAll(linkRegex)].map(match => resolvePath(match[1]));
if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');

// Helper function to process <a> tags with regex
function processLinks(html) {
    return html.replace(/<a\s+([^>]*?)>/gi, (match, attrs) => {
        const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i);
        if (!hrefMatch) return match; // Skip if no href
        const href = hrefMatch[1];
        let newAttrs = attrs;
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
            // External: Add target and rel if not present
            if (!/target\s*=\s*["']_blank["']/i.test(newAttrs)) {
                newAttrs += ` target="_blank"`;
            }
            if (!/rel\s*=\s*["']noreferrer["']/i.test(newAttrs)) {
                newAttrs += ` rel="noreferrer"`;
            }
        } else {
            // Local: Add onclick
            const path = href.startsWith('/') ? href.substring(1) : href;
            const escapedPath = path.replace(/'/g, "\\'");
            if (!/onclick\s*=\s*["'][^"']*["']/i.test(newAttrs)) {
                newAttrs += ` onclick="navigateSPA(event, '${escapedPath}')"`;
            }
        }
        return `<a ${newAttrs.trim()}>`;
    });
}
// Helper function to process <img> tags with regex
function processImages(html) {
    return html.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
        // Check for excluded classes
        if (/\b(img-footer|img-header|to-top|no-overlay)\b/i.test(attrs)) {
            return match; // Skip excluded images
        }
        const srcMatch = attrs.match(/src\s*=\s*["']([^"']+)["']/i);
        if (!srcMatch) return match; // Skip if no src
        const src = srcMatch[1];
        const escapedSrc = src.replace(/'/g, "\\'");
        let newAttrs = attrs;
        if (!/onclick\s*=\s*["'][^"']*["']/i.test(newAttrs)) {
            newAttrs += ` onclick="openImageOverlay('${escapedSrc}');return false;"`;
        }
        return `<img ${newAttrs.trim()}>`;
    });
}
htmlContent = processLinks(htmlContent);
htmlContent = processImages(htmlContent);

async function bundleFiles(type, files) {
    let concatenated = '';
    for (const file of files) {
        const result = await esbuild.build({
            entryPoints: [file],
            bundle: false,
            minify: true,
            write: false,
        });
        concatenated += result.outputFiles[0].text.trim();
    }
    if (type === 'js') {
        concatenated = concatenated.replace(/\s+/g, ' ');
    }
    concatenated = addComment(concatenated, type);
    fs.writeFileSync(`dist/bundle-${cacheBuster}.${type}`, concatenated);
}
Promise.all([bundleFiles('js', jsFiles), bundleFiles('css', cssFiles)])
    .then(() => {
        htmlContent = htmlContent.replace(/<script.*?<\/script>/g, '');
        htmlContent = htmlContent.replace('</body>', `<script src="/bundle-${cacheBuster}.js"></script></body>`);
        htmlContent = htmlContent.replace(/<link.*?stylesheet.*?>/g, '');
        htmlContent = htmlContent.replace('</head>', `<link rel="stylesheet" href="/bundle-${cacheBuster}.css"></head>`);
        htmlContent = htmlContent.replace(/\s+/g, ' ');
        htmlContent = addComment(htmlContent, 'html');
        fs.writeFileSync('dist/index.html', htmlContent);
        fs.writeFileSync('dist/404.html', htmlContent);
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
