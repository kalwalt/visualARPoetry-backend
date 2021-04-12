const fs = require('fs')
, glitch = require('glitch-canvas')
, utils = require('./modules/utils')
, dir = __dirname + '/imgs'
, reader = require('./modules/loadJson')
, gm = require('./modules/graphics');

var seed, quality, amount, iterations;
seed = 55;
quality = 60;
amount = 12;
iterations = 5;

var glitchParams = {
  seed:       seed,
	quality:    quality,
	amount:     amount,
	iterations: iterations
}
 
// This function draw some geometries and text (poems), glitch the result and save it incrementally with a date.
function make(url, book, glitchParams) {
    var width, height;
    gm(dir + url)
    .size(function(err, val) {
      width = val.width;
      height = val.height;
      this.blur(8, 4)
      this.addNoisyLines(20, 6, width, height, 880)
      this.drawCircles(10, "red", 2, "#ddffbbbb", width, height, 60)
      this.drawRectangles(4, "yellow", 7, "#ffffffbb", width, height)
      this.toBuffer('JPG', function(err, buff) {
        if (err) return console.dir(arguments)
        glitch(glitchParams)
        .fromBuffer(buff)
        .toBuffer()
        .then( function( imageBuffer ) {
          gm(imageBuffer)
          .drawPoem(w, h, book, 120, "#efe", "#888", 120, "#efe", "#886")
          .quality(84)
          .write(dir + '/visual_poetry_' + utils.getDate() + '.jpg', function (err) {
            if (!err) console.log('Image saved');
        })
      })
    })
  })
}

// This function only apply a blur effect and glitch the image. Then the image is saved with a date. Used only for testing.
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
  glitchParams.seed = utils.getRandomIntInclusive(0, 99)
  glitchParams.quality = utils.getRandomIntInclusive(0, 99)
  glitchParams.amount = utils.getRandomIntInclusive(0, 99)
  make('/fishes.jpg', obj, glitchParams)
})

// testing drawRectangles and the graphics stuff. Used only for testing.
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