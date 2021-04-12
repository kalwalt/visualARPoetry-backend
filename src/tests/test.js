const loadJ = require('../modules/loadJson')

test("test Json id", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[0].id).toBe(1)
            done()
        }
        catch (error) {
            done(error);
            }
        })
    })

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

test("test Json text poem id 1", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[0].text[0]).toBe('Leaves, ')
            done()
        }
        catch (error) {
            done(error);
            }
        })
    })

test("test Json text poem id 3", done => {
    loadJ.readWithCallback(__dirname + '/../poems/poems.json', (obj) => {
        try {
            expect(obj.poems[2].text[2]).toBe('remaining on the shore')
            done()
        }
        catch (error) {
            done(error);
            }
        })
    })