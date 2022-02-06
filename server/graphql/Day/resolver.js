const dayDAO = require("../../models/day")

const ResistanceType = Object.freeze({
  CHEST_BACK: "CHEST_BACK",
  BICEP_TRICEP: "BICEP_TRICEP",
})

module.exports = {
  ResistanceType,
  Day: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    getDay(_, args, {userId}) {
      const user = args.userId || userId;
      const myDay = dayDAO.findOne({ userId: user, date: args.date })
      if (!myDay) {
        throw new Error("Day not found")
      }
      return myDay
    },
  }
}
