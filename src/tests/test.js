const loadJ = require('../modules/loadJson')

test("test Json title", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[0].title).toBe('A lake with fishes')
            done()
        }
        catch (error) {
            done(error);
          }
        })
    })