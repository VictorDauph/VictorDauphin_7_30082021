//importation config BDD
//Cette ligne appelle le plugin dotenv qui sécurise l'environnement du serveur
const config = require("../config/config.json")

//Appelle le fichier

//Ce fichier sert à connecter l'API à la base de données
//importation framework Sequelize
const Sequelize = require("sequelize");

//Connection à la BDD MySql
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    dialect: "mysql",
    host: config.development.host
  }); 


//ce code sert à confirmer la connection à la BDD MySql
sequelize
 .authenticate()
 .then(() => {
  console.info('INFO - Database connected.')
 })
 .catch(err => {
  console.error('ERROR - Unable to connect to the database:', err)
 })


 module.exports = sequelize;
