const defSupDAO = require("../../models/defaultSup")

module.exports = {
  DefaultSup: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    defaultSupplements(_, args) {
      const defaults = defSupDAO.find()
      if (!defaults) {
        throw new Error("No default supplements found")
      }
      return defaults
    },
  }
}
