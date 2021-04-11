const fs = require('fs')
, glitch = require('glitch-canvas')
, utils = require('./modules/utils')
, dir = __dirname + '/imgs'
, reader = require('./modules/loadJson')
, gm = require('./modules/graphics');

var glitchParams = {
  seed:       55,
	quality:    60,
	amount:     12,
	iterations: 5
}
 
// This function draw some geometries and text (poems), glitch the result and save it incrementally with a date.
function make(url, book) {
    var width, height;
    width = 2200;
    height = 1650;
    gm(dir + url)
    .blur(8, 4)
    .drawRectangles(4, "yellow", 7, "#ffffffbb", width, height)
    .fontSize(120)
    .stroke("#efe", 2)
    .fill("#888")
    .drawPoem(width, height, book)
    .toBuffer('JPG', function(err, buff) {
      if (err) return console.dir(arguments)
      glitch(glitchParams)
      .fromBuffer(buff)
      .toBuffer()
      .then( function( imageBuffer ) {
        fs.writeFile( dir + '/visual_poetry_' + utils.getDate() + '.jpg', imageBuffer, function ( err ) {
          if ( err ) {
            throw err;
          } else {
            console.log( 'fromBufferToPng complete. File saved to', dir + '/visual_poetry_' + utils.getDate() + '.jpg' );
          }
      })
    })
  })
}

// This function only apply a Blur and glitch the image. Then the image is saved with a date. Used only for testing.
function saveInc(url) {
  gm(dir + url)
  .resize(220, 220)
  .blur(10, 6)
  .toBuffer('JPG', function(err, buff) {
    if (err) return console.dir(arguments)
    glitch(glitchParams)
    .fromBuffer(buff)
    .toBuffer()
    .then( function( imageBuffer ) {
      fs.writeFile( dir + '/visual_poetry_' + utils.getDate() + '.jpg', imageBuffer, function ( err ) {
        if ( err ) {
          throw err;
        } else {
          console.log( 'fromBufferToPng complete. File saved to', dir + '/visual_poetry_' + utils.getDate() + '.jpg' );
        }
    })
  })
})
}
gm.prototype.drawPoem = function(width, height, book) {
  this.fontSize(120)
  this.stroke("#efe", 2)
  this.fill("#888")
  this.drawText(width/2, height/2, book.poems[0].title)
  this.fontSize(100)
  this.stroke("#efe", 2)
  this.fill("#886")
  for (var i=0; i<3; i++){
    this.drawText(utils.getRandomIntInclusive(10, width-10), utils.getRandomIntInclusive(10, height-10), book.poems[0].text[i])
  }
  return this;
}

console.log(utils.getDate())

reader.readWithCallback(__dirname + '/poems/poems.json',(obj) => {
 make('/fishes.jpg', obj)
})

// testing drawRectangles alone
var w, h;
gm(dir + '/fishes.jpg')
.size(function(err, val) {
w = val.width;
h = val.height;
this.drawRectangles(10, "red", 2, "#ffffffbb", w, h)
if (!err) console.log('rects ok');
this.write(dir + '/draw_test.jpg', function (err) {
  if (!err) console.log('done');
});
})

console.log('Done!\n')