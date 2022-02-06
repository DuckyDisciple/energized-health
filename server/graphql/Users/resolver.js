const userDAO = require("../../models/user")
const logger = require('../../config/logger')

const RoleType = Object.freeze({
  ADMIN: "ADMIN",
  COACH: "COACH",
  USER: "USER",
})

module.exports = {
  RoleType,
  User: {
    _id({ _id }) {
      return _id
    },
  },
  Query: {
    users() {
      const users = userDAO.find().exec()
      if (!users) {
        throw new Error("Error")
      }
      return users
    },
    user(obj, args) {
      const myUser = userDAO.findOne({ username: { $eq: args.username } })
      if (!myUser) {
        throw new Error("Error")
      }
      return myUser
    },
    me(_, args, { userId }) {
      if (!userId) {
        throw new Error("You are not authenticated")
      }
      
      try {
        return userDAO.findById(userId)
      } catch(e) {
        logger.error("Me error")
        logger.error(e)
        throw new Error("Error retrieving user")
      }
    }
  }
}
