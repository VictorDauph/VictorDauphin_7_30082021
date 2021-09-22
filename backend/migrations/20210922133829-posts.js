'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable("posts", {
        postId: { //On peut spécifier tous les attributs de la colonne id:
          type: Sequelize.INTEGER(11),
          allowNull:false,
          autoIncrement: true,
          primaryKey: true,
      },
      userId: { //On peut spécifier tous les attributs de la colonne id:
          type: Sequelize.INTEGER(11),
          allowNull:false,
      },
      title: {
          type : Sequelize.STRING(100),
          allowNull:false, 
      },
      imageUrl: {
          type : Sequelize.STRING(200),
          allowNull:false, 
          },
      usersUpvotes: {
          type: Sequelize.JSON,
          defaultValue:"[]"
      },
      usersDownvotes: {
          type: Sequelize.JSON,
          defaultValue:"[]"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull:false, 
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull:false, 
    },
  })


  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts")
  }
};
