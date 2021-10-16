const gm = require('./../modules/graphics')
, utils = require('./../modules/utils')
, glitch = require('glitch-canvas')
, dir = __dirname + '/../imgs'
, fs = require('fs')
, Color = require('./../modules/colors')

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

// This function only apply a blur effect and glitch the image. Then the image is saved with a date. Used only for testing.
function saveInc(url, glitchParams) {
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

function simpleGm() {
    gm(560, 110, "#00ff55aa")
    .fontSize(68)
    .stroke("#efe", 2)
    .fill("#555")
    .drawText(20, 72, "Visual")
    .fill("#fa0")
    .drawText(232, 72, "AR Poetry")
    .write(dir + '/test.jpg', function(err){
        if (err) return console.dir(arguments)
        console.log(this.outname + ' created  :: ' + arguments[3])
    })
}

// testing drawRectangles and the graphics stuff. Used only for testing.
function simpleTest(url) {
    var w, h;
    console.log("path is: ", process.cwd());
    var basepath = process.cwd();
    var combinedpath = basepath + '/src/images/';
    console.log("combined path is: ", combinedpath);
    gm(combinedpath + url)
    .size(function(err, val) {
        console.log(val);
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
        this.write(combinedpath + '/draw_test.jpg', function (err) {
            if (!err) console.log('done');
        });
    })
}

function recursiveLinesTest(url) {
    var w, h;
    var randColor = new Color(120, 120, 120, 120);
    var colorX = new Color(220, 10, 100, 0);
    var colorY = new Color(20, 110, 200, 0);
    gm(dir+url)
    .size(function(err, val) {
        w = val.width;
        h = val.height;
        this.fill('green')
        this.stroke("#880", 4)
        this.drawCircleWithRadius(220, 220, 50)
        this.drawCircles(10, "red", 2, "#ddffbbbb", w, h, 60)
        this.drawRectangles(10, "red", 2, "#ffffffbb", w, h)
        this.recursiveLinesX(20, 320, 20, 10, 200, colorX, true)
        this.recursiveLinesY(20, 320, 20, 10, 200, colorY, false)
        //this.randomLines(120, 220, 220, 400, randColor)
        this.improvedRandomLines(120, 220, 220, 400, randColor, w, h)
        if (!err) console.log('rects ok');
        this.quality(84)
        this.write(dir + '/rec_lines_test_I.jpg', function (err) {
            if (!err) console.log('done');
        });
    })
}

function testColors() {
  const colors = new Color(20,20,20, 120)
  console.log(colors);
  console.log(colors.getColor());
  colors.setColor(120, 200, 100, 255)
  console.log(colors.getColor());
  const col = Color.setGmColor(20, 30, 120, 255);
  console.log(col);
  const colorsNew = new Color(110, 12, 34, 250);
  console.log('show new gm color');
  console.log(colorsNew.getGmColor());
}


// simpleTest and saveInc need to be fixed. They partially fails in github actions, see PR https://github.com/kalwalt/visualARPoetry-backend/pull/4
simpleTest('fishes.jpg')
// recursiveLinesTest('/fishes.jpg')
// saveInc('/fishes.jpg', glitchParams)
simpleGm()
// testColors()
