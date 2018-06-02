const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const {
  getImgNames,
  randomNoRepeats,
  prepareDayStructure
} = require("../helpers/daysAndImages");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

const Note = mongoose.model("notes");
const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  const today = moment().format("DD MMMM YYYY");
  res.render("notes/add", { today });
});

router.post("/", ensureAuthenticated, (req, res) => {
  const { title, fullHour, quarter, body, day } = req.body;
  const date = moment(day, 'DD MMMM YYYY');
  date.add(parseInt(fullHour), "hours");
  date.add(parseInt(quarter), "minutes");
  const newNote = {
    title,
    body,
    date,
    user: req.user.id
  };
  new Note(newNote)
    .save()
    .then(() => {
      res.redirect("/notes/weekly");
    })
    .catch(err => console.log(err));
});

router.get("/weekly", ensureAuthenticated, (req, res) => {
  const week = prepareDayStructure();
  Note.find({ user: req.user.id })
    .sort({ date: "asc" })
    .then(notes => {
      notes.forEach(note => {
        week.forEach(day => {
          if (moment(note.date).isSame(day.date, "day")) {
            day.note.push(note);
          }
        });
      });
      res.render("plans/week", { week });
    })
    .catch(err => console.log(err));
});

router.get("/add/:date", ensureAuthenticated, (req, res) => {
  const day = moment.unix(req.params.date / 1000).format("DD MMM YYYY");
  res.render("notes/add", { day });
});

router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Note.findOne({ _id: req.params.id, user: req.user.id })
    .then(note => {
      res.render("notes/edit", {
        note,
        fullHour: moment(note.date).format("HH:00"),
        quarter: moment(note.date).format("mm")
      });
    })
    .catch(err => console.log(err));
});

router.put("/:id", (req, res) => {
  Note.findOne({
    _id: req.params.id
  })
    .then(note => {
      const { title, body, fullHour, quarter } = req.body;
      note.title = title;
      note.body = body;
      note.date = new Date(
        note.date
          .toString()
          .replace(
            /\d{2}:\d{2}:\d{2}/,
            `${parseInt(fullHour)}:${parseInt(quarter)}:00`
          )
      );
      note
        .save()
        .then(() => {
          res.redirect("/notes/weekly");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res) => {
  Note.remove({ _id: req.params.id }).then(() => {
    res.redirect("/notes/weekly");
  });
});

module.exports = router;
