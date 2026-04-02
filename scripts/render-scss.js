'use strict';
const autoprefixer = require('autoprefixer')
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const postcss = require('postcss')
const sass = require('sass');
const sh = require('shelljs');

const scssStylesPath = upath.resolve(upath.dirname(__filename), '../src/scss/styles.scss');
const cssStylesPath = upath.resolve(upath.dirname(__filename), '../src/css/styles.css');
const destPath = upath.resolve(upath.dirname(__filename), '../dist/css/styles.css');

function getStylesEntryPath() {
    if (sh.test('-e', scssStylesPath)) {
        return scssStylesPath;
    }

    if (sh.test('-e', cssStylesPath)) {
        return cssStylesPath;
    }

    throw new Error('Could not find styles entry file. Expected src/scss/styles.scss or src/css/styles.css.');
}

module.exports = function renderSCSS() {
    const stylesEntryPath = getStylesEntryPath();
    
    const results = sass.renderSync({
        file: stylesEntryPath,
        includePaths: [
            upath.resolve(upath.dirname(__filename), '../node_modules')
        ],
      });

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    postcss([ autoprefixer ]).process(results.css, {from: 'styles.css', to: 'styles.css'}).then(result => {
        result.warnings().forEach(warn => {
            console.warn(warn.toString())
        })
        fs.writeFileSync(destPath, `${copyright}\n${result.css.toString()}`);
    })

};

const copyright = `/*!
* Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
*/
`