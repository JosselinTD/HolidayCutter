module.exports = class Period {
  #startDate;
  #endDate;

  constructor(startDate, endDate) {
    this.#checkDateOrderingConstraint(startDate, endDate);
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  getStartDate() {
    return this.#startDate;
  }

  setStartDate(startDate) {
    this.#checkDateOrderingConstraint(startDate, this.#endDate);
    this.#startDate = startDate;
  }

  getEndDate() {
    return this.#endDate;
  }

  setEndDate(endDate) {
    this.#checkDateOrderingConstraint(this.#startDate, endDate);
    this.#endDate = endDate;
  }

  #checkDateOrderingConstraint(startDate, endDate) {
    if (startDate > endDate) {
      throw new Error("Start date higher than end date");
    }
  }
};
