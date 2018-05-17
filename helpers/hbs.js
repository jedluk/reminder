const moment = require('moment');

module.exports = {
  isFirstDayInMonth: day => {
    return day === 1 ? true : false;
  },
  isFriday: day => {
    return day.toLowerCase() === "friday" ? true : false;
  },
  endWeek: name => {
    return name.toLowerCase() === "sunday" ? true : false;
  },
  beginWeek: (name, day) => {
    return name.toLowerCase() === "monday" || day === 1 ? true : false;
  },
  getWeek: date => {
    const endWeek = moment(date).endOf('week');
    return `Week ${moment(date).format('DD/MM')} - ${moment(endWeek.add(1,'day')).format('DD/MM')}`;
  },
  countOffset: day => {
    switch (day.toLowerCase()) {
      case "tuesday":
        return "offset-s3";
      case "wednesday":
        return "offset-s6";
      case "thursday":
        return "offset-s9";
      default:
        return "";
    }
  }
};
