'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      commentId: {
        type: Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: { //On peut spécifier tous les attributs de la colonne id:
      type: Sequelize.INTEGER(11),
      allowNull:false,
  },
    postId: { //On peut spécifier tous les attributs de la colonne id:
      type: Sequelize.INTEGER(11),
      allowNull:false,
  },
    content: { //On peut spécifier tous les attributs de la colonne id:
      type: Sequelize.TEXT,
      allowNull:false,
  },
  flagged:{
    type: Sequelize.BOOLEAN,
    defaultValue:false 
  },

  },);
  await queryInterface.addConstraint('comments',
    {
    fields: ["userId"],
    type: 'foreign key',
    name: 'userIdCommentFk',
    references: 
    { //Required field
      table: 'users',
      field: 'userId',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
  await queryInterface.addConstraint('comments',
  {
  fields: ["postId"],
  type: 'foreign key',
  name: 'postIdCommentFk',
  references: 
  { //Required field
    table: 'posts',
    field: 'postId',
  },
  onDelete: 'cascade',
  onUpdate: 'cascade'
});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};