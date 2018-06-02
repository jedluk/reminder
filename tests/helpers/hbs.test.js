const mocha = require("mocha");
const assert = require("chai").assert;
const moment = require("moment");

const {
  isFriday,
  countOffset,
  singleDay,
  singleHour,
  getWeek,
} = require("../../helpers/hbs");

describe("handlebars helper methods", () => {
  describe("isFriday method", () => {
    it("should return true when day name is friday", () => {
      let friday = "friday";
      let result = isFriday(friday);
      assert.isTrue(result);
      friday = "Friday";
      result = isFriday(friday);
      assert.isTrue(result);
    });
    it("should return false when expression contains friday but not on the begging", () => {
      const friday = "hello is friday here";
      const result = isFriday(friday);
      assert.isFalse(result);
    });
    it("should return false when day name is different than friday", () => {
      const something = "something very bad";
      const notFriday = isFriday(something);
      assert.isFalse(notFriday);
    });
  });
  describe("countOffset method", () => {
    it("should return offset 3 on tuesday and friday", () => {
      const properOffset = "offset-s3";
       ["tuesday", "friday"].forEach(day => {
        const result = countOffset(day);
        assert.isString(result);
        assert.equal(result, properOffset);
      });
    });
    it("should return offset 6 on wednesday and saturday", () => {
      const properOffset = "offset-s6";
      ["wednesday", "saturday"].forEach(day => {
        const result = countOffset(day);
        assert.isString(result);
        assert.equal(result, properOffset);
      });
    });
    it("should return offset 9 on thursday and sunday", () => {
      const properOffset = "offset-s9";
      ["thursday", "sunday"].forEach(day => {
        const result = countOffset(day);
        assert.isString(result);
        assert.equal(result, properOffset);
      });
    });
  });
  describe('singleDay method', () => {
    it('should format day correcty [Do, dddd]', () => {
      const properFormat = /\d{1,2}(st)|(nd)|(rd)|(th), [A-Z][a-z]*/;
      const now = moment();
      const output = singleDay(now);
      assert.match(output, properFormat);
    });
  });
  describe('singleHour method', () => {
    it('should format hour correcty [HH:mm:ss]', () => {
      const properFormat = /\d{2}:\d{2}:\d{2}/;
      const now = moment();
      const output = singleHour(now);
      assert.match(output, properFormat);
    });
  });
  describe('getWeek method', () => {
    it('should format week correctly [Week dd/dd - dd/dd]', () => {
      const properFormat = /Week \d{2}\/\d{2} - \d{2}\/\d{2}/;
      const now = moment();
      const output = getWeek(now);
      assert.match(output, properFormat);
    });
  });
});
