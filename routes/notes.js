const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

const Note = mongoose.model("notes");

router.get("/", (req,res) => {
  const today = moment().format('DD MMMM YYYY');
  res.render("notes/add", { today });
});

router.get("/weekly", (req,res) => {
  res.render('index/dashboard');
});

router.post("/", ensureAuthenticated, (req,res) => {
  const { title, fullHour, quarter, body, day } = req.body;
  const date = moment(day);
  date.add(parseInt(fullHour),'hours').format('HH');
  date.add(parseInt(quarter),'minutes').format('mm');
  const newNote = {
    title,
    body,
    date: new Date(date),
    user: req.user.id,
  };

  // new Note(newNote)
  // .save()
  // .then(note => {
  //   console.log(note);
  //   res.redirect(`/notes/weekly`);
  // })
  // .catch(err => console.log(err));
});



module.exports = router;