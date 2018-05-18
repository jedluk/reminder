const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const path = require('path');
const HERE = __dirname;
const fs = require('fs');
const { countOffset } = require('../helpers/hbs');

const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

router.get("/",  ensureGuest, (req, res) => {
  res.render("index/index");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("index/dashboard");
});

router.get("/about", (req, res) => {
  res.render("index/about");
});

router.get("/calendar", (req, res) => {
  const days = [];
  const month = moment().format('MMMM YYYY');
  const daysInMonth = moment().daysInMonth();
  const images = getImgNames(daysInMonth);
  const random = randomNoRepeats(images);
  for(let day = 1; day <= daysInMonth; day++){
    const fullDay = moment(`${day} ${month}`);
    days.push({
      fullDay: moment(fullDay),
      number: day,
      name: fullDay.format('dddd'),
      img: random()
    });
  }
  const offset = countOffset(moment().startOf('month').format('dddd'));
  res.render("index/calendar", { days, month, offset });
});

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

module.exports = router;