'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      userId: { //On peut spécifier tous les attributs de la colonne id:
        type: Sequelize.STRING(100),
        unique: true,
        allowNull:false,
        primaryKey: true,
    },
    password: {
        type : Sequelize.STRING(60),
        allowNull:false, 
        },
    sharedPosts: {
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
    return queryInterface.dropTable("users")
  }
};
