const Period = require("../../entities/Period/period");

function periodToSimpleObject(period) {
  if (!(period instanceof Period)) {
    throw new Error("Argument must be a Period");
  }
  return {
    startDate: formatDate(period.getStartDate()),
    endDate: formatDate(period.getEndDate()),
  };
}

function formatDate(date) {
  return `${date.getUTCFullYear()}-${("0" + (date.getUTCMonth() + 1)).slice(
    -2
  )}-${("0" + date.getUTCDate()).slice(-2)}`;
}

module.exports = {
  periodToSimpleObject,
  formatDate,
};
