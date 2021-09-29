'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //clé étrangère userId
      User.hasMany(comment, { as: "comments", foreignKey: "userId" }); 
      comment.belongsTo(User, {as: "Users", foreignKey: "userId"});
      //clé étrangère postId
      Post.hasMany(comment, { as: "comments", foreignKey: "postId" }); 
      comment.belongsTo(Post, {as: "Posts", foreignKey: "postId"});
    }
  };
  comment.init({
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

  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};