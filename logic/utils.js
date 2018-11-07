"use strict";

const http = require('http');

function setGlobalInclude(dirPath) {
    global.base_dir = dirPath;
    global.abs_path = (path) => base_dir + path;

    global.include = function(file) {
        if (file.indexOf('/') === -1) return require(file);
        return require(abs_path('/' + file))
    }
}

function keepServerAlive() {
    let minutes = 5;
    let interval = minutes * 60000;
    let url = process.env.URL_DOMAIN_NAME;
    setInterval(() => http.get(url), minutes);
}

module.exports = {
    setGlobalInclude,
    keepServerAlive
};