const snackDAO = require("../../models/snack")

module.exports = {
  Snack: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    userSnackForDay(_, {userId, date}) {
      const daySnack = snackDAO.findOne({ userId: userId, date: date })
      if (!daySnack) {
        throw new Error("Snack not found")
      }
      return daySnack
    },
  }
}
