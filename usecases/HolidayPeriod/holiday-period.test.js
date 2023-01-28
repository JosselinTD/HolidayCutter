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
        holiday.intersectWith(
          new Period(new Date("2022-01-01"), new Date("2022-01-31"))
        )
      ).toBe(true);
    });

    test("should check if holiday is fully included in another period, answering false", () => {
      expect(
        holiday.intersectWith(
          new Period(new Date("2022-05-01"), new Date("2022-05-31"))
        )
      ).toBe(false);
    });

    test("should check if holiday is partially included in another period, answering true", () => {
      expect(
        holiday.intersectWith(
          new Period(new Date("2022-01-07"), new Date("2022-01-31"))
        )
      ).toBe(true);
    });
  });

  describe("cutting", () => {
    test("should return just one period with same start and end date when a cutting is not needed", () => {
      const holiday = new HolidayPeriod(
        new Date("2022-01-01"),
        new Date("2022-01-15")
      );
      const cuttedPeriods = holiday.cutByMonths();
      expect(cuttedPeriods.length).toBe(1);
      expect(cuttedPeriods[0].getStartDate().toISOString()).toBe(
        holiday.getStartDate().toISOString()
      );
      expect(cuttedPeriods[0].getEndDate().toISOString()).toBe(
        holiday.getEndDate().toISOString()
      );
    });

    test("should return multiple period on the same year", () => {
      const holiday = new HolidayPeriod(
        new Date("2022-01-15"),
        new Date("2022-03-22")
      );
      const cuttedPeriods = holiday.cutByMonths();
      expect(cuttedPeriods.length).toBe(3);
      expect(cuttedPeriods[0].getStartDate().toISOString()).toBe(
        new Date("2022-01-15").toISOString()
      );
      expect(cuttedPeriods[0].getEndDate().toISOString()).toBe(
        new Date("2022-02-01").toISOString()
      );
      expect(cuttedPeriods[1].getStartDate().toISOString()).toBe(
        new Date("2022-02-01").toISOString()
      );
      expect(cuttedPeriods[1].getEndDate().toISOString()).toBe(
        new Date("2022-03-01").toISOString()
      );
      expect(cuttedPeriods[2].getStartDate().toISOString()).toBe(
        new Date("2022-03-01").toISOString()
      );
      expect(cuttedPeriods[2].getEndDate().toISOString()).toBe(
        new Date("2022-03-22").toISOString()
      );
    });

    test("should return multiple period on multiple years", () => {
      const holiday = new HolidayPeriod(
        new Date("2022-01-15"),
        new Date("2024-03-22")
      );
      const cuttedPeriods = holiday.cutByMonths();
      expect(cuttedPeriods.length).toBe(27);
      expect(cuttedPeriods[0].getStartDate().toISOString()).toBe(
        new Date("2022-01-15").toISOString()
      );
      expect(cuttedPeriods[0].getEndDate().toISOString()).toBe(
        new Date("2022-02-01").toISOString()
      );
      const marchingDate = new Date("2022-02-01");
      for (let i = 1; i < 26; i++) {
        expect(cuttedPeriods[i].getStartDate().toISOString()).toBe(
          marchingDate.toISOString()
        );
        marchingDate.setUTCMonth(marchingDate.getUTCMonth() + 1);
        expect(cuttedPeriods[i].getEndDate().toISOString()).toBe(
          marchingDate.toISOString()
        );
      }
      expect(cuttedPeriods[26].getStartDate().toISOString()).toBe(
        new Date("2024-03-01").toISOString()
      );
      expect(cuttedPeriods[26].getEndDate().toISOString()).toBe(
        new Date("2024-03-22").toISOString()
      );
    });
  });
});
