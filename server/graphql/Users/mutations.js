const userDAO = require('../../models/user');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const logger = require('../../config/logger');
const { RoleType } = require('./resolver');

module.exports = {
  Mutation: {
    changePassword: async (_, { oldPass, newPass }, { userId }) => {
      try {
        const foundUser = await userDAO.findById(userId);

        if (!foundUser) {
          throw new Error('Authentication error');
        }

        const valid = await bcrypt.compare(oldPass, foundUser.password);

        if (!valid) {
          throw new Error('Incorrect password');
        }

        foundUser.password = bcrypt.hashSync(newPass, 10);
        foundUser.save();
        return true;
      } catch (e) {
        logger.error('Error changing password');
        logger.error(e);
        throw new Error('Error changing password');
      }
    },
    changeRole: async (_, args, { role }) => {
      if (role !== 'ADMIN') {
        throw new Error('Only admins can make this change');
      }

      try {
        const res = userDAO.findByIdAndUpdate(args.userId, { role: args.role });
        return res;
      } catch (e) {
        logger.error('Unable to update user');
        logger.error(e);
        throw new Error(e.message);
      }
    },
    createUser: async (_, args, { role }) => {
      if (role !== RoleType.ADMIN) {
        throw new Error('Only admins can make this change');
      }

      try {
        const userData = args;
        userData.password = bcrypt.hashSync(args.password, 10);
        userData.displayName = args.displayName || args.username;
        userData.role = RoleType.USER;
        const res = await userDAO.create(userData);
        return {
          token: jsonwebtoken.sign(
            { id: res._id, username: res.username },
            process.env.JWT_SECRET,
            { expiresIn: '8d' }
          ),
          user: res,
        };
      } catch (e) {
        throw new Error('Error creating account');
      }
    },
    editUser: async (_, args, { role }) => {
      if (role !== RoleType.ADMIN && role !== RoleType.COACH) {
        throw new Error('Only admins and coaches can make this change');
      }

      try {
        const userData = {};
        if (args.password && args.password.length > 0) {
          userData.password = bcrypt.hashSync(args.password, 10);
        }
        if (args.username && args.username.length > 0)
          userData.username = args.username;
        if (args.displayName && args.displayName.length > 0)
          userData.displayName = args.displayName;
        if (args.email && args.email.length > 0) userData.email = args.email;

        const res = await userDAO.findByIdAndUpdate(args._id, userData, {
          new: true,
        });
        return res;
      } catch (e) {
        logger.error('edit user error');
        logger.error(e);
        throw new Error('Error updating account');
      }
    },
    login: async (_, { username, password }) => {
      try {
        const foundUser = await userDAO.findOne({
          username: { $eq: username },
        });

        if (!foundUser) {
          throw new Error('Invalid username');
        }

        const valid = await bcrypt.compare(password, foundUser.password);

        if (!valid) {
          throw new Error('Incorrect password');
        }

        return {
          token: jsonwebtoken.sign(
            {
              id: foundUser._id,
              username: foundUser.username,
              role: foundUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          ),
          user: foundUser,
        };
      } catch (e) {
        logger.error('Login error');
        logger.error(e);
        throw new Error('Login error');
      }
    },
    updateUser: (_, args, { userId }) => {
      try {
        const res = userDAO.findByIdAndUpdate(userId, args);
        return res;
      } catch (e) {
        logger.error('Unable to update user');
        logger.error(e);
        throw new Error(e.message);
      }
    },
  },
};
