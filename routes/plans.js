const express = require("express");
const router = express.Router();

router.get("/weekly", (req,res) => {
  res.render('plans/week');
});

module.exports = router;