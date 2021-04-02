const markdownJson = require('markdown-json');
const settings = {
        name: 'markdown-json',
      	cwd: './',
        src: './',
        filePattern: '**/*.md',
        ignore: "*(icon|input)*",
        dist: '../dist/collection.json',
        metadata: false,
        server: false,
        port: 3001
      };

markdownJson(settings).then((data) => {
  console.log('data:', data);
}).catch((err) => {
  console.log('error:', err);
})