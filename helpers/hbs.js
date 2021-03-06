const moment = require('moment');

module.exports = {
  isFirstDayInMonth: day => {
    return day === 1 ? true : false;
  },
  isFriday: day => {
    return /^fri/.test(day.toLowerCase()) ? true : false;
  },
  endWeek: name => {
    return /^sun/.test(name.toLowerCase()) ? true : false;
  },
  beginWeek: (name, day) => {
    return /^mon/.test(name.toLowerCase()) || day === 1 ? true : false;
  },
  getWeek: date => {
    const endWeek = moment(date,'DD MMMM YYYY').endOf('week');
    return `Week ${moment(date).format('DD/MM')} - ${moment(endWeek.add(1,'day')).format('DD/MM')}`;
  },
  singleHour: date => {
    return moment(date).format('HH:mm:ss');
  },
  singleDay: date => {
    return moment(date).format('Do, dddd');
  },
  select: function(selected, options) {
    return options
    .fn(this)
    .replace(
      new RegExp(' value="' + selected + '"'),
      '$& selected="selected"'
    )
    .replace(
      new RegExp(">" + selected + "</option>"),
      ' selected="selected"$&'
    );
  },
  countOffset: day => {
    switch (day.toLowerCase()) {
      case "tuesday":
      case "friday":
        return "offset-s3";
      case "wednesday":
      case "saturday":
        return "offset-s6";
      case "thursday":
      case "sunday":
        return "offset-s9";
      default:
        return "";
    }
  }
};
