const saltDAO = require("../../models/salt")
const logger = require("../../config/logger")

module.exports = {
  Mutation: {
    addSalt: async (_, args) => {
      try {
        const res = await saltDAO.create(args)
        return res
      } catch (e) {
        logger.log("warn", "Add salt error", e)
        throw new Error("Error adding salt")
      }
    },
    removeSalt: async (_, {_id}) => {
      try {
        const res = await saltDAO.deleteOne({_id: _id})
        return res
      } catch (e) {
        logger.log("warn", "remove salt error", e)
        throw new Error("Error removing salt")
      }
    },
  }
}
