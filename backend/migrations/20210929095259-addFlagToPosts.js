'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("posts", "flagged",
    {
      type: Sequelize.BOOLEAN,
      defaultValue:false  
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("posts", "flagged")
  }
};
