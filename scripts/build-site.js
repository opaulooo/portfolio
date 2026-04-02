'use strict';

const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

const rootPath = upath.resolve(upath.dirname(__filename), '..');
const distPath = upath.resolve(rootPath, 'dist');
const distSrcPath = upath.resolve(distPath, 'src');

function ensureDir(dirPath) {
    if (!sh.test('-e', dirPath)) {
        sh.mkdir('-p', dirPath);
    }
}

function copyRecursive(sourcePath, destPath) {
    ensureDir(upath.dirname(destPath));
    sh.cp('-R', sourcePath, destPath);
}

function buildIndexHTML() {
    const sourceIndexPath = upath.resolve(rootPath, 'index.html');
    const distIndexPath = upath.resolve(distPath, 'index.html');
    const sourceHTML = fs.readFileSync(sourceIndexPath, 'utf8');

    const outputHTML = sourceHTML
        .replace(/src="src\/https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.1\.0\/dist\/js\/bootstrap\.bundle\.min\.js"/, 'src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"');

    fs.writeFileSync(distIndexPath, outputHTML);
}

function buildDeployTree() {
    ensureDir(distSrcPath);

    copyRecursive(upath.resolve(rootPath, 'src/components'), upath.resolve(distSrcPath, 'components'));
    copyRecursive(upath.resolve(rootPath, 'src/assets'), upath.resolve(distSrcPath, 'assets'));
    copyRecursive(upath.resolve(distPath, 'js'), upath.resolve(distSrcPath, 'js'));

    ensureDir(upath.resolve(distSrcPath, 'css'));
    sh.cp(upath.resolve(distPath, 'css/styles.css'), upath.resolve(distSrcPath, 'css/styles.css'));
    sh.cp(upath.resolve(rootPath, 'src/css/portfolio.css'), upath.resolve(distSrcPath, 'css/portfolio.css'));
}

buildIndexHTML();
buildDeployTree();