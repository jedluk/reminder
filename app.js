const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// require("./models/User");
// require("./models/Note")

// Handlebars helpers
const { endWeek, beginWeek, getWeek, isFirstDayInMonth, isFriday } = require("./helpers/hbs");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      isFirstDayInMonth,
      isFriday,
      endWeek,
      beginWeek,
      getWeek
    },
    defaultLayout: "main"
  })
);
const index = require("./routes/index");
// Use Routes
app.use("/", index);
app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
