//* This file is used to serve this application in my portfolio webserver.

const { execSync } = require('child_process');
const { existsSync } = require('fs');

// Install Dependencies
execSync('npm install', {
    stdio: 'inherit'
});

// Install Yargs & Express
execSync('npm install yargs express', {
    stdio: 'inherit'
});

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;

// Build the project
const doBuild = argv.build;
if (doBuild || !existsSync(__dirname + '/dist')) {
    execSync('npm run build', {
        stdio: 'inherit'
    });
    if (doBuild) process.exit(0);
}


// Application
const express = require('express');
const port = Number(argv.port || '4010');
const app = express();
const { basename } = require('path');
app.listen(port, () => {
    console.log(basename(__dirname), 'is listening on port', port);
})

// Serve Files
let dist = `${__dirname}/dist`;
let index = require('path').resolve(`${dist}/index.html`);
let serve = express.static(dist);
app.use(serve, (req, res, next) => {
    res.sendFile(index);
});



