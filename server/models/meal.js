const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mealSchema = new Schema({
  date: {
    type: String,
    validate: {
      validator: function(v) {
        return /^2\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(v);
      },
      message: props => `${props.value} is not a valid date!`
    },
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  time: {
    type: String,
    validate: {
      validator: function(v) {
        return /^([0-1][0-9]|2[0-3]):[0-5]\d$/.test(v);
      },
      message: props => `${props.value} is not a valid time!`
    },
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  notes: String,
})

mealSchema.index({ date: -1, userId: 1, time: 1 }, { unique: true })

module.exports = mongoose.model("Meal", mealSchema, "Meal")