const Period = require("../../entities/Period/period");
const HolidayPeriod = require("../../usecases/HolidayPeriod/holiday-period");
const utils = require("../utils/utils");

async function intersectWith(request, reply) {
  const period = new Period(
    new Date(request.body.period.startDate),
    new Date(request.body.period.endDate)
  );
  const holiday = new HolidayPeriod(
    new Date(request.body.holiday.startDate),
    new Date(request.body.holiday.endDate)
  );
  return { intersectWith: holiday.intersectWith(period) };
}

async function cutByMonths(request, reply) {
  const holiday = new HolidayPeriod(
    new Date(request.body.startDate),
    new Date(request.body.endDate)
  );
  const holidays = holiday.cutByMonths();
  return holidays.map(utils.periodToSimpleObject);
}

module.exports = {
  intersectWith,
  cutByMonths,
};
