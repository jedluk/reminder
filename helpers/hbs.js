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
  //TODO: fix this one.
  getWeek: day => {
    return day < 8 ? 1 : day < 15 ? 2 : day < 22 ? 3 : day < 29 ? 4 : 5;
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
