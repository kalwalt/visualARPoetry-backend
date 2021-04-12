const gm = require('gm')
const utils = require('./utils')
const SimplexNoise = require('simplex-noise')
simplex = new SimplexNoise(Math.random),

gm.prototype.drawRectangles = function(num, strokeColor, strokeSize, fillColor, width, height) {
    for (var i=0; i < num; i++) {
        this.stroke(strokeColor, strokeSize)
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

gm.prototype.drawCircleWithRadius = function(x, y, radius) {
    this.drawCircle(x, y, x + radius, y + radius);
}

gm.prototype.drawCircles = function(numCircles, strokeColor, strokeSize, fillColor, width, height, radius) {
    for (var i = 0; i < numCircles; i++) {
        this.stroke(strokeColor, strokeSize)
        this.fill(fillColor)
        this.drawCircleWithRadius(
            utils.getRandomIntInclusive(10, width-10), 
            utils.getRandomIntInclusive(10, height-10),
            utils.getRandomIntInclusive(0, radius)
        )
    }
    return this;
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

gm.prototype.addNoisyLines = function(numLines, spacing, width, height, length) {
    var r, g, st = 0;
    for(var i = 0; i < numLines; i++) {
        for(var j = 0; j < numLines; j++) {
            x = simplex.noise2D(i, j);
            y = simplex.noise2D(i, j);
            r = utils.convertToInt(x, 0, 255);
            g = utils.convertToInt(y, 0, 255);
            this.stroke('rgb(' + r + ',' + g + ', 120)', 3);
            var factor = utils.convertToInt(y, 0, height);
            this.drawLine(st, j, length, factor + length);
            st += spacing;
            if(st>width) { break; }
        }
    }
    return this;
}

module.exports = gm