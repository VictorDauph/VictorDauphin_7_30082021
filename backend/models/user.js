//Chargement de l'ORM Sequelize
const Sequelize = require("sequelize");

//sequelize contient la méthode pour se connecter à la BDD et intéragir avec!
const sequelize = require("../database/connection");

// .define est la méthode pour créer un modèle
module.exports = sequelize.define("User", { //1er paramètre = nom du modèle, second paramètre = données du schéma

    userId: { //userId est l'email de l'utilisateur
        type : Sequelize.STRING(100),
        unique: true,
        allowNull:false, 
        primaryKey: true,
    },
    password: {
        type : Sequelize.STRING(60),
        allowNull:false, 
        },
    role: {
        type : Sequelize.STRING(60),
        allowNull:false,
        defaultValue:"standard" 
        },
});
