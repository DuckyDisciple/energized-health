const mongoose = require("mongoose")

// define the Resistance model schema
const resistanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

resistanceSchema.index({ name: 1 })

module.exports = mongoose.model("Resistance", resistanceSchema, "Resistance")
