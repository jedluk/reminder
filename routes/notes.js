const express = require("express");
const moment = require('moment');
const router = express.Router();
const mongoose = require('mongoose');
const { getImgNames, randomNoRepeats } = require('../helpers/imgChooser');
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

const Note = mongoose.model("notes");

router.get("/", ensureAuthenticated, (req,res) => {
  const today = moment().format('DD MMMM YYYY');
  res.render("notes/add", { today });
});

router.get("/add/:date", ensureAuthenticated, (req,res) => {
  const day = moment.unix(req.params.date / 1000).format('DD MMM YYYY');
  res.render("notes/add", { day });
})

router.get("/weekly", ensureAuthenticated, (req,res) => {
  const week = prepareDayStructure();
  Note.find({user: req.user.id})
  .sort({date: 'asc'})
  .then(notes => {
    notes.forEach(note => {
      week.forEach(day => {
        if(moment(note.date).isSame(day.date,'day')){
          day.note.push(note);
        }
      });
    });
    res.render('plans/week',{ week });
  })
  .catch(err => console.log(err));
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

  new Note(newNote)
  .save()
  .then(note => {
    res.redirect('/notes/weekly');
  })
  .catch(err => console.log(err));
});

router.delete("/:id", (req,res) => {
  Note.remove({_id: req.params.id})
  .then(() => {
    res.redirect("/notes/weekly");
  });
});

const prepareDayStructure = () => {
  const WEEK_DAYS = 7;
  const images = getImgNames(WEEK_DAYS);
  const random = randomNoRepeats(images);
  const week = [{
    date: moment().startOf('isoWeek'),
    note: [],
    img: random() 
  }];
  for(let nextDay = 1; nextDay < WEEK_DAYS ; nextDay++){
    week.push({
      date: moment(week[0].date).add(nextDay,'d'),
      note: [],
      img: random()
    });
  }
  return week;
}

module.exports = router;