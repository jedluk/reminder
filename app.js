const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("./models/User");
require("./models/Note");
require("./config/passport")(passport);
const keys = require("./config/keys");
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connection with DB has been established"))
  .catch(err => console.log(err));
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
const {
  endWeek,
  beginWeek,
  getWeek,
  isFirstDayInMonth,
  isFriday
} = require("./helpers/hbs");
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
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(
  session({
    secret: "cnjk1232sapodqw324",
    resave: false,
    saveUninitialized: false
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/notes", require("./routes/notes"));
app.use("/plans", require("./routes/plans"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
