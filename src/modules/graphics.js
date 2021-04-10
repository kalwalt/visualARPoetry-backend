const gm = require('gm')
const utils = require('./utils')

gm.prototype.drawRectangles = function(num, width, height) {
    for (var i=0; i < num; i++) {
        this.stroke("yellow", 7)
        this.fill("#ffffffbb")
        this.drawRect(
            utils.getRandomIntInclusive(10, width-10), 
            utils.getRandomIntInclusive(10, height-10), 
            utils.getRandomIntInclusive(10, width), 
            utils.getRandomIntInclusive(10, height)
        )
    }
   return this;
}

gm.prototype.drawRect = function(x, y, width, height) {
  this.drawRectangle(x, y, x + width, y + height);
}

module.exports = gm