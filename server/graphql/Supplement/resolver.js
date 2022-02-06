const supplementDAO = require("../../models/supplement")

module.exports = {
  Supplement: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    userSupplementsForDay(_, {userId, date}) {
      const daySupplements = supplementDAO.find({ userId: userId, date: date })
      if (!daySupplements) {
        throw new Error("Supplements not found")
      }
      return daySupplements
    },
  }
}
