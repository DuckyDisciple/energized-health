const mealDAO = require("../../models/meal")

module.exports = {
  Meal: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    userMealsForDay(_, {userId, date}) {
      const dayMeals = mealDAO.find({ userId: userId, date: date })
      if (!dayMeals) {
        throw new Error("Meals not found")
      }
      return dayMeals
    },
  }
}
