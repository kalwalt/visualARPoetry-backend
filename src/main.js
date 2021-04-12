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
    .addNoisyLines(20, 6, width, height, 880)
    .drawCircles(10, "red", 2, "#ddffbbbb", width, height, 60)
    .drawRectangles(4, "yellow", 7, "#ffffffbb", width, height)
    .toBuffer('JPG', function(err, buff) {
      if (err) return console.dir(arguments)
      glitch(glitchParams)
      .fromBuffer(buff)
      .toBuffer()
      .then( function( imageBuffer ) {
        gm(imageBuffer)
        .drawPoem(w, h, book, 120, "#efe", "#888", 120, "#efe", "#886")
      .write(dir + '/visual_poetry_' + utils.getDate() + '.jpg', function (err) {
        if (!err) console.log('done');
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
this.fill('green')
this.stroke("#880", 4)
this.drawCircleWithRadius(220, 220, 50)
this.drawCircles(10, "red", 2, "#ddffbbbb", w, h, 60)
this.drawRectangles(10, "red", 2, "#ffffffbb", w, h)
this.addNoisyLines(20, 6, w, h, 880)
if (!err) console.log('rects ok');
this.quality(84)
this.write(dir + '/draw_test.jpg', function (err) {
  if (!err) console.log('done');
});
})

console.log('Done!\n')