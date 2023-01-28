const Period = require("../../entities/Period/period");

module.exports = class HolidayPeriod extends Period {
  intersectWith(period) {
    return (
      this.getStartDate() <= period.getEndDate() &&
      this.getEndDate() >= period.getStartDate()
    );
  }

  cutByMonths() {
    const periodsCuttedByMonth = [];
    let cuttedPeriod = HolidayPeriod.#getOneDayPeriod(this.getStartDate());

    do {
      cuttedPeriod.#extendToLowerBetweenNextMonthAnd(this.getEndDate());

      periodsCuttedByMonth.push(cuttedPeriod);

      cuttedPeriod = HolidayPeriod.#getOneDayPeriod(cuttedPeriod.getEndDate());
    } while (!this.#hasSameEndDate(cuttedPeriod));

    return periodsCuttedByMonth;
  }

  #extendToLowerBetweenNextMonthAnd(date) {
    this.#extendToNextMonth();
    this.#shrinkIfTooLargeTo(date);
  }

  #extendToNextMonth() {
    this.getEndDate().setUTCMonth(this.getEndDate().getUTCMonth() + 1);
    this.getEndDate().setUTCDate(1);
  }

  #shrinkIfTooLargeTo(date) {
    if (this.getEndDate() > date) {
      this.setEndDate(new Date(date));
    }
  }

  #hasSameEndDate(period) {
    return (
      this.getEndDate().toISOString() === period.getEndDate().toISOString()
    );
  }

  static #getOneDayPeriod(date) {
    return new HolidayPeriod(new Date(date), new Date(date));
  }
};
