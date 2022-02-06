const saltDAO = require("../../models/salt")

module.exports = {
  Salt: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    userSaltForDay(_, {userId, date}) {
      const daySalt = saltDAO.find({ userId: userId, date: date })
      if (!daySalt) {
        throw new Error("Salts not found")
      }
      return daySalt
    },
  }
}
