//Chargement de l'ORM Sequelize
const Sequelize = require("sequelize");

//sequelize contient la méthode pour se connecter à la BDD et intéragir avec!
const sequelize = require("../database/connection");

module.exports = sequelize.define("Comment", {

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

})

  