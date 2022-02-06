const mongoose = require("mongoose")

// define the Day model schema
const daySchema = new mongoose.Schema({
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
  prelaunchDay: Number,
  day: Number,
  videoWatched: {
    type: Boolean,
    default: false
  },
  videoNotes: String,
  walkMinutes: Number,
  shuffleMinutes: Number,
  resistanceSets: Number,
  resistanceType: {
    type: String,
    enum: ["CHEST_BACK", "BICEP_TRICEP"]
  },
  waterGoal: Number,
  notes: String,
})

daySchema.index({ date: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model("Day", daySchema, "Day")
