//Chargement de l'ORM Sequelize
const Sequelize = require("sequelize");

//sequelize contient la méthode pour se connecter à la BDD et intéragir avec!
const sequelize = require("../database/connection");

// .define est la méthode pour créer un modèle
module.exports = sequelize.define("Post", { //1er paramètre = nom du modèle, second paramètre = données du schéma

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
});
