const defSupDAO = require('../../models/defaultSup');
const { RoleType } = require('../Users/resolver');
const logger = require('../../config/logger');

module.exports = {
  Mutation: {
    addDefaultSupplement: async (_, args, { role }) => {
      if (role !== RoleType.ADMIN) {
        throw new Error('You are not authorized to add a default supplement');
      }

      try {
        const res = await defSupDAO.create(args);
        return res;
      } catch (e) {
        logger.log('warn', 'Add default supplement error', e);
        throw new Error('Error adding default supplement');
      }
    },
    removeDefaultSupplement: async (_, { _id }) => {
      try {
        const res = await defSupDAO.deleteOne({ _id: _id });
        return res;
      } catch (e) {
        logger.log('warn', 'remove supplement error', e);
        throw new Error('Error removing supplement');
      }
    },
  },
};
