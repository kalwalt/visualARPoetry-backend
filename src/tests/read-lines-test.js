const utils = require('./../modules/utils');
const process = require('process')

var basepath = process.cwd()

var array = utils.readLines(basepath + '/list2.txt');
console.log(array);