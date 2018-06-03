const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const { countOffset } = require('../helpers/hbs');
const { getImgNames, randomNoRepeats } = require('../helpers/daysAndImages');
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
  const images = getImgNames();
  const random = randomNoRepeats(images);
  for(let day = 1; day <= daysInMonth; day++){
    const fullDay = moment(`${day} ${month}`, 'DD MMMM YYYY');
    days.push({
      fullDay,
      number: day,
      name: fullDay.format('ddd'),
      img: random()
    });
  }
  const offset = countOffset(moment().startOf('month').format('dddd'));
  res.render("index/calendar", { days, month, offset });
});

router.get('*', (req,res) => {
  res.status(404).send({msg: "Not Found"});
})

module.exports = router;