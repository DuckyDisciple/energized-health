const categoryDAO = require("../../models/category")
const menuDAO = require("../../models/menu")

module.exports = {
  Menu: {
    _id({ _id }) {
      return _id
    },
    title({ title }) {
      return title
    },
    logo({ logo }) {
      return logo
    },
    bgImage({ bgImage }) {
      return bgImage
    },
    categories({ categories }) {
      return categoryDAO.find({ _id: categories })
    },
  },
  Query: {
    allMenus(_, args, { userIsAdmin }) {
      if (!userIsAdmin) {
        throw new Error("Only admins can see this")
      }
      const menus = menuDAO.find().exec()
      if (!menus) {
        throw new Error("Error")
      }
      return menus
    },
    async menu(_, { _id }) {
      try {
        const menu = await menuDAO.findOne({ _id: { $eq: _id } })
        if (!menu) {
          throw new Error()
        }
        return menu
      } catch (e) {
        console.error(e)
      }
    },
    menuByTitle(obj, { title }) {
      const myMenu = categoryDAO.findOne({ title: { $eq: title } })
      if (!myMenu) {
        throw new Error("Error")
      }
      return myMenu
    },
  },
}
