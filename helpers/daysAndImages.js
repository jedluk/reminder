const path = require("path");
const fs = require("fs");
const moment = require("moment");
const HERE = __dirname;

const getImgNames = () => {
  const imgDir = path.join(HERE, "..", "public", "img", "bitmaps");
  const images = fs.readdirSync(imgDir, "utf8");
  return images;
};

const randomNoRepeats = array => {
  let copy = array.slice(0);
  return () => {
    if (copy.length < 1) {
      copy = array.slice(0);
    }
    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];
    copy.splice(index, 1);
    return item;
  };
};

const prepareDayStructure = () => {
  const WEEK_DAYS = 7;
  const images = getImgNames();
  const random = randomNoRepeats(images);
  const week = [
    {
      date: moment().startOf("isoWeek"),
      note: [],
      img: random()
    }
  ];
  for (let nextDay = 1; nextDay < WEEK_DAYS; nextDay++) {
    week.push({
      date: moment(week[0].date).add(nextDay, "d"),
      note: [],
      img: random()
    });
  }
  return week;
};

module.exports = {
  getImgNames,
  randomNoRepeats,
  prepareDayStructure
};
