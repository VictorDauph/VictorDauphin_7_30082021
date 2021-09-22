// Cette ligne intègre express au projet
const express = require('express');

//Cette ligne appelle le plugin dotenv qui sécurise l'environnement du serveur
require('dotenv').config()

//Cette ligne importe helmetJS: sécurisation des headers.
const helmet = require("helmet");

//Donne accès aux chemins du système de fichiers
const path = require ('path');

// Cette ligne indique qu'on peut appeler Express avec la constante app
const app = express();

//initialiser DataBase, si elle n'existe pas
//require("./database/initialisation")

//Importation des routers
const postRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

//importe le rate limiter pour protéger des attaques force brute
const rateLimit = require("express-rate-limit");
const maxRequests = process.env.MAX_REQUESTS;

// Ce code sert à limiter le nombre de connections d'un utilisateur unique
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: maxRequests, //chaque IP est limitée à 100 requétes
})

//Ce middleware indique dans la console du serveur qu'une requête a été reçue.
app.use((req, res, next) => {
  console.log('Requête reçue!')
  next();
}); 

//ce middleware génère des headers pour gérer la sécurité CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Ce middleware parse le body de toutes les requêtes en JSON pour être utilisables.
app.use(
  limiter,
  helmet(), //helmetJS pour sécuriser les headers
  express.json(),
);

//Ce middleware sert à gérer les requêtes get d'images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Ces middlewares contiennent le début des routes à appliquer aux stuffRoutes et userRoutes. et se servent des routes contenues dans les fichiers routeurs pour traiter les requêtes.
app.use('/api/post', postRoutes)
app.use('/api/account', userRoutes) 

module.exports = app;

