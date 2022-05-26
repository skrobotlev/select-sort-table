module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");
  return {
    people: _.times(100, function (n) {
      return {
        date: faker.date.past(),
        company: faker.company.companyName(),
        distance: faker.random.number({ min: 1, max: 42 }),
        amount: faker.finance.amount(),
      };
    }),
  };
};
