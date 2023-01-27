const Period = require("../../entities/Period/period");

module.exports = class HolidayPeriod extends Period {
  intercectWith(period) {
    return (
      this.getStartDate() <= period.getEndDate() &&
      this.getEndDate() >= period.getStartDate()
    );
  }
};
