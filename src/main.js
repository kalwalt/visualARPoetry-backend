const glitch = require('glitch-canvas')
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
    var outName = '/visual_poetry_' + utils.getDate() + '.jpg';
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
          .drawPoem(width, height, book, 120, "#efe", "#888", 120, "#efe", "#886")
          .quality(84)
          .write(dir + outName, function (err) {
            if (!err) console.log('Image saved');
        })
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

console.log('Done!\n')