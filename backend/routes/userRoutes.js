//importation framework express
const express = require('express');

//chargement du middleware niveau router
const router = express.Router();

//importation fichier controlleur
const userCtrl = require('../controllers/userControllers');

//importation du fichier d'authentification par token
const auth = require("../middleware/auth")

//on utilise des routes post car les requêtes doivent contenir des informations: email et mdp 
router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);
router.delete('/:id',auth,userCtrl.delete);

module.exports = router;