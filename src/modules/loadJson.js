const fs = require("fs");

const readWithCallback = function (url, callback) {
    let obj;
    fs.readFile(url, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        callback(obj);
    });
}

module.exports = {
    readWithCallback
}