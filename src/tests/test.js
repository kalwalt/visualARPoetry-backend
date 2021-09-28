const loadJ = require('../modules/loadJson')
, utils = require('../modules/utils')
, Color = require('../modules/colors')

test("test Json id", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[0].id).toBe(1)
            done()
        } catch (error) {
            done(error);
        }
    })
})

test("test Json title", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[0].title).toBe('A lake with fishes')
            done()
        } catch (error) {
            done(error);
        }
    })
})

test("test Json text poem id 1", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[0].text[0]).toBe('Leaves, ')
            done()
        } catch (error) {
            done(error);
        }
    })
})

test("test Json text poem id 3", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[2].text[2]).toBe('remaining on the shore')
            done()
        } catch (error) {
            done(error);
        }
    })
})

test("test utils getDate is not undefined", done => {
    expect(utils.getDate()).not.toBeUndefined();
    done();
})

test("test utils getRandomIntInclusive return int number >= 0", done => {
    expect(utils.getRandomIntInclusive(0, 10)).toBeGreaterThanOrEqual(0);
    done();
})

test("test utils convertToInt return int number", done => {
    expect(utils.convertToInt(0.02, 0, 100)).toBe(2);
    done();
})

test("test colors return int number", done => {
    let colors = new Color(120, 120, 120, 255);
    expect(colors.r).toBe(120);
    done();
})
