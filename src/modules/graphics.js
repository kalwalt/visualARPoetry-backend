const gm = require('gm')
const utils = require('./utils')

gm.prototype.drawRectangles = function(num, color, strokeSize, fillColor, width, height) {
    for (var i=0; i < num; i++) {
        this.stroke(color, strokeSize)
        this.fill(fillColor)
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

gm.prototype.drawPoem = function(width, height, book, fontSizeTitle, strokeTitle, fillTitle, fontSizeText, strokeText, fillText) {
    this.fontSize(fontSizeTitle)
    this.stroke(strokeTitle, 2)
    this.fill(fillTitle)
    this.drawText(width/2, height/2, book.poems[0].title)
    this.fontSize(fontSizeText)
    this.stroke(strokeText, 2)
    this.fill(fillText)
    for (var i=0; i<3; i++){
      this.drawText(utils.getRandomIntInclusive(10, width-10), utils.getRandomIntInclusive(10, height-10), book.poems[0].text[i])
    }
    return this;
  }

module.exports = gm