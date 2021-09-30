//importation framework express
const express = require('express');

//chargement du middleware niveau router
const router = express.Router();

//importation du middleware d'authentification pour les actions réservées aux admins.
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

// Cette route permet de signaler un commentaire
router.put('/flag/:userId/:commentId', auth, commentCtrl.flag);

// Cette route permet de désignaler un commentaire
router.put('/unflag/:userId/:commentId',auth, adminAuth, commentCtrl.unflag); 

//Cette route permet de récupérer tous les commentaires liés à un post
router.get("/getFrom/:postId",auth,commentCtrl.getCommentsFromPost)

//Fetch tous les commentaires signalés pour besoins de modération
router.get("/flagged",auth,adminAuth,commentCtrl.getFlaggedComments)

//Fetch un commentaire pour besoins de modération
router.get("/flagged/:commentId",auth,adminAuth,commentCtrl.getOneComment)

module.exports = router;