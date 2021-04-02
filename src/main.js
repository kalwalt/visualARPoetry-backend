var gm = require('gm')
, dir = __dirname + '/imgs';
 
// transform the image
function make(url) {
    var width, height;
    width = 2200;
    height = 1650;
    gm(dir + url)
    .blur(8, 4)
    .drawRectangles(4, width, height)
    .fontSize(120)
    .stroke("#efe", 2)
    .fill("#888")
    .drawText(width/2, height/2, "Visual Poetry")
    .write(dir + '/visual_poetry.png', function (err) {
      if (!err) console.log('Image saved!\n');
    });
}

// from https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

gm.prototype.drawRectangles = function(num, width, height) {
    for (var i=0; i < num; i++) {
        this.stroke("yellow", 7)
        this.fill("#ffffffbb")
        this.drawRectangle(
            getRandomIntInclusive(10, width/2), 
            getRandomIntInclusive(10, height/2), 
            getRandomIntInclusive(width/2, width-10), 
            getRandomIntInclusive(height/2, height-10)
        )
    }
   return this;
}

make('/fishes.jpg')

console.log('Done!\n')