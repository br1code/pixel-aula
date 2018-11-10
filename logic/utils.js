'use strict';

const http = require('http');

function setGlobalInclude(dirPath) {
    global.base_dir = dirPath;
    global.abs_path = (path) => base_dir + path;

    global.include = function(file) {
        if (file.indexOf('/') === -1) return require(file);
        return require(abs_path('/' + file));
    }
}

function getURLDomainName() {
    let port = process.env.PORT || 3000;
    let localURL = 'http://localhost:' + port;
    return process.env.URL_DOMAIN_NAME || localURL;
}

function getDBLocalURL() {
    return 'mongodb://localhost/pixelaula';
}

function keepServerAlive() {
    let minutes = process.env.KEEP_SERVER_ALIVE_INTERVAL || 5;
    let interval = minutes * 60000;
    let url = getURLDomainName();
    setInterval(() => http.get(url), interval);
}

module.exports = {
    setGlobalInclude,
    getDBLocalURL,
    keepServerAlive
};