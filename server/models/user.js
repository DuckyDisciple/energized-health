const mongoose = require("mongoose")

// define the User model schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  },
  displayName: String,
  email: String,
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "COACH"],
    default: "USER",
    required: true
  },
  defaultWaterGoal: {
    type: Number,
    default: 160,
    required: true
  },
  defaultSupplementJsons: [String],
})

userSchema.index({ username: 1 })

module.exports = mongoose.model("User", userSchema)
