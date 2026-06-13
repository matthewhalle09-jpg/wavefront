// Rebuild index.html from game.template.html + icons_data.js, stamping a build id.
const fs=require('fs');
const tpl=fs.readFileSync('game.template.html','utf8');
const icons=fs.readFileSync('icons_data.js','utf8');
const stamp=Date.now().toString(36);
fs.writeFileSync('index.html',tpl.replace('/*__ICON_DATA__*/',icons).replace("__BUILD__",stamp));
fs.writeFileSync('version.txt',stamp+'\n');
console.log('built index.html, version',stamp);
