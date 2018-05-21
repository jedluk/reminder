const path = require('path');
const fs = require('fs');
const HERE = __dirname;

const getImgNames = (amount) => {
  const imgDir = path.join(HERE, '..' , 'public', 'img', 'bitmaps');
  const images = fs.readdirSync(imgDir,'utf8');
  return images;
}

const randomNoRepeats = (array) => {
  let copy = array.slice(0);
  return () => {
    if (copy.length < 1) { copy = array.slice(0); }
    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

module.exports = {
  getImgNames,
  randomNoRepeats
}