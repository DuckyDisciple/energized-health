const mongoose = require("mongoose")

// define the Default Supplement model schema
const defaultSupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  unit: {
    type: String,
    required: true
  },
})

defaultSupSchema.index({ name: 1 })

module.exports = mongoose.model("DefaultSup", defaultSupSchema, "DefaultSup")
