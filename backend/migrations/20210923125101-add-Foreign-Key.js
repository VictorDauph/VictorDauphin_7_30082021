'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('posts',
    {
    fields: ["userId"],
    type: 'foreign key',
    name: 'userIdFk',
    references: 
    { //Required field
      table: 'users',
      field: 'userId',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("posts","userIdFk")
  }
};
