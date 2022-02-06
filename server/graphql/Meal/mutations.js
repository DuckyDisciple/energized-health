const mealDAO = require("../../models/meal")
const logger = require("../../config/logger")

module.exports = {
  Mutation: {
    addMeal: async (_, args) => {
      try {
        const res = await mealDAO.create(args)
        return res
      } catch (e) {
        logger.log("warn", "Add meal error", e)
        throw new Error("Error adding meal")
      }
    },
    removeMeal: async (_, {_id}) => {
      try {
        const res = await mealDAO.deleteOne({_id: _id})
        return res
      } catch (e) {
        logger.log("warn", "remove meal error", e)
        throw new Error("Error removing meal")
      }
    },
  }
}
