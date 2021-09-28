const dateFormat = require("dateformat")
, now = new Date();

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

module.exports = {
    convertToInt, getDate, getRandomIntInclusive
}