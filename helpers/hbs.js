module.exports = {
  endWeek: function(day){
    return (day % 7) === 0 ? true : false;
  },
  beginWeek: function(day){
    return day == 1 || day == 8 || day == 15 || day == 22 || day == 29 ? true : false;
  }
}