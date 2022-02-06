const snackDAO = require("../../models/snack")
const logger = require("../../config/logger")

module.exports = {
  Mutation: {
    addSnack: async (_, args) => {
      try {
        const res = await snackDAO.create(args)
        return res
      } catch (e) {
        logger.log("warn", "Add snack error", e)
        throw new Error("Error adding snack")
      }
    },
    removeSnack: async (_, {_id}) => {
      try {
        const res = await snackDAO.deleteOne({_id: _id})
        return res
      } catch (e) {
        logger.log("warn", "remove snack error", e)
        throw new Error("Error removing snack")
      }
    },
  }
}
