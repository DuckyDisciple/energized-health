const waterDAO = require("../../models/water")
const logger = require("../../config/logger")

module.exports = {
  Mutation: {
    addWater: async (_, args) => {
      try {
        const res = await waterDAO.create(args)
        return res
      } catch (e) {
        logger.log("warn", "Add water error", e)
        throw new Error("Error adding water")
      }
    },
    removeWater: async (_, {_id}) => {
      try {
        const res = await waterDAO.deleteOne({_id: _id})
        return res
      } catch (e) {
        logger.log("warn", "remove water error", e)
        throw new Error("Error removing water")
      }
    },
  }
}
