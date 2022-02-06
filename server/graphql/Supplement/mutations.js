const supplementDAO = require("../../models/supplement")
const logger = require("../../config/logger")

module.exports = {
  Mutation: {
    addSupplement: async (_, args) => {
      try {
        const res = await supplementDAO.create(args)
        return res
      } catch (e) {
        logger.log("warn", "Add supplement error", e)
        throw new Error("Error adding supplement")
      }
    },
    removeSupplement: async (_, {_id}) => {
      try {
        const res = await supplementDAO.deleteOne({_id: _id})
        return res
      } catch (e) {
        logger.log("warn", "remove supplement error", e)
        throw new Error("Error removing supplement")
      }
    },
  }
}
