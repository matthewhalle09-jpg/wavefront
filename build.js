// Rebuild index.html from game.template.html + icons_data.js
const fs=require('fs');
const tpl=fs.readFileSync('game.template.html','utf8');
const icons=fs.readFileSync('icons_data.js','utf8');
fs.writeFileSync('index.html',tpl.replace('/*__ICON_DATA__*/',icons));
console.log('built index.html');
