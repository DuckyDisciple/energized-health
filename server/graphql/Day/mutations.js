const dayDAO = require("../../models/day")
const userDAO = require("../../models/user")
const supplementDAO = require("../../models/supplement")
const logger = require("../../config/logger")
const { ResistanceType } = require("./resolver")

module.exports = {
  Mutation: {
    addDay: async (_, args) => {
      try {
        // Get defaults
        const user = await userDAO.findOne({ _id: args.userId })
        const dayData = args
        dayData.waterGoal = user.defaultWaterGoal
        const res = await dayDAO.create(dayData)
        return res
      } catch (e) {
        logger.log("warn", "Add day error", e)
        throw new Error("Error adding day")
      }
    },
    updateDay: async (_, {_id, input}) => {
      try {
        const res = await dayDAO.findByIdAndUpdate(_id, input)
        return res
      } catch (e) {
        logger.log("warn", "update day error", e)
        throw new Error("Error updating day")
      }
    },
  }
}