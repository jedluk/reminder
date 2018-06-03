const assert = require("chai").assert;
const moment = require("moment");
const {
  getImgNames,
  randomNoRepeats,
  prepareDayStructure
} = require("../../helpers/daysAndImages");

describe("image and day helpers methods", () => {
  describe("prepareDayStructure method", () => {
    it("should return exactly 7 next days in array", () => {
      const dayStructure = prepareDayStructure();
      assert.isArray(dayStructure);
      assert.lengthOf(dayStructure, 7);
      const sameDay = moment(dayStructure[0].date)
        .add(6, "day")
        .isSame(dayStructure[dayStructure.length - 1].date, "day");
      assert.isTrue(sameDay);
    });
    it("should return proper day structure", () => {
      prepareDayStructure().forEach(day => {
        assert.isObject(day);
        assert.property(day, "date");
        assert.property(day, "note");
        assert.property(day, "img");
      });
    });
    it("should fill object with proper values", () => {
      prepareDayStructure().forEach(day => {
        const { date, note, img } = day;
        assert.isTrue(moment.isMoment(date));
        assert.isArray(note);
        assert.isEmpty(note);
        assert.match(img, /^bitmap\d{1,2}.jpg/);
      });
    });
  });
  describe("randomNoRepeats method", () => {
    it("should chose elements from array without repetition", () => {
      const noRepetitiontArray = [10, 15, 25, 4, 2, 5, 6];
      const random = randomNoRepeats(noRepetitiontArray);
      const newArr = [];
      for (let i = 0; i < noRepetitiontArray.length; i++) {
        const el = random();
        assert.isNumber(el);
        assert.oneOf(el, noRepetitiontArray);
        newArr.push(el);
      }
      assert.lengthOf(newArr, noRepetitiontArray.length);
      assert.sameMembers(noRepetitiontArray, newArr);
    });
  });
  describe("getImgNames", () => {
    it("should read all 32 images", () => {
      const amount = 32;
      const images = getImgNames();
      assert.isArray(images);
      assert.lengthOf(images, amount);
    });
    it("should read only bitmaps[bitmapDD.jpg]", () => {
      getImgNames().forEach(img => {
        assert.match(img, /^bitmap\d{1,2}.jpg$/);
      });
    });
  });
});
