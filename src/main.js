var gm = require('gm')
, fs = require('fs')
, dateFormat = require("dateformat")
, now = new Date()
, dir = __dirname + '/imgs'
, book = require('./poems/poems.json');
 
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
    .drawText(width/2, height/2, book.poems[0].title)
    .write(dir + '/visual_poetry.jpg', function (err) {
      if (!err) console.log('Image saved!\n');
    });
}

function saveInc(url) {
  gm(dir + url)
  .resize(220, 220)
  .blur(10, 6)
  .toBuffer('JPG', function(err, buff) {
    if (err) return console.dir(arguments)
    fs.writeFileSync(dir + '/visual_poetry_' + getDate() + '.jpg', buff)
    console.log('done!');
  })
}

function getDate() {
  return dateFormat(now, "isoDateTime");
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

console.log(getDate())

make('/fishes.jpg')
saveInc('/fishes.jpg')

console.log('Done!\n')