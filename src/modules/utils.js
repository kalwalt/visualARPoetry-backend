const dateFormat = require("dateformat")
, now = new Date();

const fs = require('fs');

const writeStream = fs.createWriteStream('list.txt');
const pathName = writeStream.path;

const getDate = function() {
    return dateFormat(now, "isoDateTime");
}
  
  // from https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const convertToInt = function(value, min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(value * (max - min + 1)) + min;
}

const saveFileArr = function (folder) {
    fs.readdir(folder, (err, files) => {
        if (err) {
            console.error(err);
        }
        console.log(files);
        files.forEach(value => writeStream.write(`${value}\n`));

        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish', () => {
            console.log(`wrote all the array data to file ${pathName}`);
        });

        // handle the errors on the write process
        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file ${pathName} => ${err}`)
        });

        // close the stream
        writeStream.end();
    })
}

module.exports = {
    convertToInt, getDate, getRandomIntInclusive, saveFileArr
}