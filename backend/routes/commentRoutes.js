//importation framework express
const express = require('express');

//chargement du middleware niveau router
const router = express.Router();

//importation du middleware d'authentification
const adminAuth = require('../middleware/adminAuth')

//importation fichier controlleur
const commentCtrl = require('../controllers/commentController');

//importation du fichier d'authentification par token
const auth = require("../middleware/auth")

//importation des fichiers de vérification des droits utilisateur
const checkUser = require("../middleware/checkUser")
const checkCommentsRights=require("../middleware/checkCommentsRights")

//Création commentaire
router.post('/',auth,commentCtrl.createComment);

//Suppression commentaire
router.delete('/:userId/:commentId',auth,checkUser,checkCommentsRights,commentCtrl.deleteComment);

//Modification commentaire
router.put('/:userId/:commentId',auth,checkUser,checkCommentsRights,commentCtrl.modifyComment);


module.exports = router;