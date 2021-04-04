var gm = require('gm')
, fs = require('fs')
, glitch = require('glitch-canvas')
, dateFormat = require("dateformat")
, now = new Date()
, dir = __dirname + '/imgs'
, book = require('./poems/poems.json');

var glitchParams = {
  seed:       55,
	quality:    60,
	amount:     12,
	iterations: 5
}
 
// This function draw some geometries and text (poems), glitch the result and save it incrementally with a date.
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
    //.drawText(width/2, height/2, book.poems[0].title)
    .drawPoem(width, height)
    .toBuffer('JPG', function(err, buff) {
      if (err) return console.dir(arguments)
      glitch(glitchParams)
      .fromBuffer(buff)
      .toBuffer()
      .then( function( imageBuffer ) {
        fs.writeFile( dir + '/visual_poetry_' + getDate() + '.jpg', imageBuffer, function ( err ) {
          if ( err ) {
            throw err;
          } else {
            console.log( 'fromBufferToPng complete. File saved to', dir + '/visual_poetry_' + getDate() + '.jpg' );
          }
      })
    })
  })
}

// This function only apply a Blur and glitch the image. Then the image is saved with a date.
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
      fs.writeFile( dir + '/visual_poetry_' + getDate() + '.jpg', imageBuffer, function ( err ) {
        if ( err ) {
          throw err;
        } else {
          console.log( 'fromBufferToPng complete. File saved to', dir + '/visual_poetry_' + getDate() + '.jpg' );
        }
    })
  })
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

gm.prototype.drawPoem = function(width, height) {
  this.fontSize(120)
  this.stroke("#efe", 2)
  this.fill("#888")
  this.drawText(width/2, height/2, book.poems[0].title)
  this.fontSize(100)
  this.stroke("#efe", 2)
  this.fill("#886")
  for (var i=0; i<3; i++){
    this.drawText(getRandomIntInclusive(10, width-10), getRandomIntInclusive(10, height-10), book.poems[0].text[i])
  }
  return this;
}

console.log(getDate())

make('/fishes.jpg')
// Use saveInc() only for testing !!
//saveInc('/fishes.jpg')

console.log('Done!\n')