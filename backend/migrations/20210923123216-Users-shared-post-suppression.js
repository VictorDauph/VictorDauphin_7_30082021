'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => { //suppression colonne sharedPosts
    return queryInterface.removeColumn("users", "sharedPosts")
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "sharedPosts",
    {
      type: Sequelize.JSON,
      defaultValue:"[]"
  }
    )}
};
