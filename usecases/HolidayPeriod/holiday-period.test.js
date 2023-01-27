const Period = require("../../entities/Period/period");
const HolidayPeriod = require("./holiday-period");

describe("holiday period", () => {
  describe("basic workflow", () => {
    const holiday = new HolidayPeriod(
      new Date("2022-01-01"),
      new Date("2022-01-15")
    );
    test("should be an instance of Period", () => {
      expect(new HolidayPeriod()).toBeInstanceOf(Period);
    });

    test("should check if holiday is fully included in another period, answering true", () => {
      expect(
        holiday.intercectWith(
          new Period(new Date("2022-01-01"), new Date("2022-01-31"))
        )
      ).toBe(true);
    });

    test("should check if holiday is fully included in another period, answering false", () => {
      expect(
        holiday.intercectWith(
          new Period(new Date("2022-05-01"), new Date("2022-05-31"))
        )
      ).toBe(false);
    });

    test("should check if holiday is partially included in another period, answering true", () => {
      expect(
        holiday.intercectWith(
          new Period(new Date("2022-01-07"), new Date("2022-01-31"))
        )
      ).toBe(true);
    });
  });
});
