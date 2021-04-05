const fs = require("fs");
//const fs = require("fs").promises;
const path = require("path");

const readWithCallback = function(url, callback) {
    let obj;
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      callback(obj);
    });  
}

/* // to develop...
async function readWithPromises(filename) {
    try {
        const filepath = path.join(process.cwd(), filename);
        const contents = await fs.readFile(filepath, "utf8");
        console.log("File Contents:", contents);
    } catch (error) {
        console.error(error);
    }
}
*/

module.exports = {
    readWithCallback
}