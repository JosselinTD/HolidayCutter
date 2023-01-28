const Period = require("../../entities/Period/period");
const utils = require("./utils");

describe("utils", () => {
  describe("periodToSimpleObject", () => {
    test("should return a simple object", () => {
      expect(
        utils.periodToSimpleObject(
          new Period(new Date("2022-01-01"), new Date("2022-01-15"))
        )
      ).toStrictEqual({
        startDate: "2022-01-01",
        endDate: "2022-01-15",
      });
    });
    test("should throw an error", () => {
      expect(() => utils.periodToSimpleObject({})).toThrow(
        "Argument must be a Period"
      );
    });
  });
});
