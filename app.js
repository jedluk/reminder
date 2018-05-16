const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require('method-override');
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();
app.use(methodOverride('_method'));
app.engine('handlebars' , exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) => {
  res.render("index/index");
})

app.listen(process.env.PORT || 5000, () => console.log('Server is running'));