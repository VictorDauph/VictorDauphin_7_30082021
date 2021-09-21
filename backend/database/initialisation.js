//Se serait peut être mieux de la faire en migration?

//Ce fichier vérifie les tables de la BDD et les crée si nécessaire, à parti des modèles créés
console.log("intialisation")

//chargement des données de connection
const sequelize = require("./connection")

//importation du fichier qui gère les relations entre tables
require("../models/relations")

//Charger les modèles de l'API, les comparer aux tables de la base MySql, créer ou modifier les ta de la base si nécessaire/
sequelize.sync({})