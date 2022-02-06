const mongoose = require("mongoose")
const logger = require("../config/logger")

module.exports.connect = uri => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // plug in the promise library:
  mongoose.Promise = global.Promise

  mongoose.connection.on("error", err => {
    logger.log("error", `Mongoose connection error: ${err}`)
    process.exit(1)
  })

  // load models
  require("./user")
  require("./day")
  require("./meal")
  require("./supplement")
  require("./defaultSup")
  require("./water")
  require("./salt")
  require("./resistance")
  require("./snack")
}
