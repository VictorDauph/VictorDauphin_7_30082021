'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 //suppression colonne commentsList de la table post
      return queryInterface.removeColumn("posts", "commentsList")
    
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn("users", "sharedPosts",
      {
        type: Sequelize.JSON,
        defaultValue:"[]"
    })
  }
};
