const waterDAO = require("../../models/water")

module.exports = {
  Water: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    userWatersForDay(_, {userId, date}) {
      const dayWaters = waterDAO.find({ userId: userId,
      date: date })
      if (!dayWaters) {
        throw new Error("Waters not found")
      }
      return dayWaters
    },
  }
}
