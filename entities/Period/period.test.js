const Period = require("./period");

describe("period", () => {
  describe("basic worflow", () => {
    let period;
    const startDate = new Date("2022-01-01");
    const endDate = new Date("2022-01-31");

    test("should create a period with starting and end date", () => {
      period = new Period(startDate, endDate);
      expect(period).not.toBe(undefined);
    });

    test("should get starting date", () => {
      expect(period.getStartDate().toISOString()).toBe(startDate.toISOString());
    });

    test("should get end date", () => {
      expect(period.getEndDate().toISOString()).toBe(endDate.toISOString());
    });

    test("should set start date", () => {
      const newStartDate = new Date("2022-01-15");
      period.setStartDate(newStartDate);
      expect(period.getStartDate().toISOString()).toBe(
        newStartDate.toISOString()
      );
    });

    test("should set end date", () => {
      const newEndDate = new Date("2022-02-28");
      period.setEndDate(newEndDate);
      expect(period.getEndDate().toISOString()).toBe(newEndDate.toISOString());
    });
  });

  describe("error handling", () => {
    test("should not allow a start date later than an end date at creation", () => {
      expect(
        () => new Period(new Date("2022-02-01"), new Date("2022-01-01"))
      ).toThrow("Start date higher than end date");
    });

    test("should not allow a start date later than an end date while setting start date", () => {
      const period = new Period(new Date("2022-01-01"), new Date("2022-01-31"));
      expect(() => period.setStartDate(new Date("2022-02-01"))).toThrow(
        "Start date higher than end date"
      );
    });

    test("should not allow a start date later than an end date while setting end date", () => {
      const period = new Period(new Date("2022-01-01"), new Date("2022-01-31"));
      expect(() => period.setEndDate(new Date("2021-02-01"))).toThrow(
        "Start date higher than end date"
      );
    });
  });
});
