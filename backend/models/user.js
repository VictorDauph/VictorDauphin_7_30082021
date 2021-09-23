//Chargement de l'ORM Sequelize
const Sequelize = require("sequelize");

//sequelize contient la méthode pour se connecter à la BDD et intéragir avec!
const sequelize = require("../database/connection");

// .define est la méthode pour créer un modèle
module.exports = sequelize.define("User", { //1er paramètre = nom du modèle, second paramètre = données du schéma

    userId: { //On peut spécifier tous les attributs de la colonne id:
        type: Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type : Sequelize.STRING(35),
        allowNull:false, 
        unique: true
    },
    password: {
        type : Sequelize.STRING(60),
        allowNull:false, 
        },
});
