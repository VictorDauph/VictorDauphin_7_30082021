//importation des dépendances
//importation framework express
const express = require('express');

//chargement du middleware niveau router
const router = express.Router();

//importation du fichier controlleur
const postCtrl = require('../controllers/postController')

//importation du middleware d'authentification
const auth = require('../middleware/auth')

//importation du middleware d'authentification
const adminAuth = require('../middleware/adminAuth')

//importation du middleware de vérification des droits utilisateurs
const checkUser = require("../middleware/checkUser")

//importation du middleware de vérification des droits spécifiques aux posts
const checkPostsRights = require("../middleware/checkPostsRights")

//importation du middleware de config multer (gestion fichiers)
const multer = require('../middleware/multer-config')

//Définition des routes
//Ce middleware créé une route POST pour liker et disliker les posts
router.post('/:postId/like',auth,postCtrl.likePost);

//Ce middleware créé une route POST pour ajouter des posts. Il utilise le schéma de données Post comme une classe et le contenu de la requête pour créer une instance de Post.
router.post('/', auth, multer,  postCtrl.createPost);

//route delete pour suppression d'un post
router.delete('/:postId',auth,checkUser,checkPostsRights,postCtrl.deletePost );

// Cette route va chercher tous les posts pour les passer au frontend. Les posts sont formatés selon ce qui est attendu par le front-end.
router.get('/', auth, postCtrl.getAllPosts);

// Cette route va chercher un post unique avec son id.
router.get('/single/:postId', auth, postCtrl.getOnePost);

// Cette route va chercher tous les posts d'un utilisateur
router.get('/fromUser/', auth, postCtrl.getPostsFromUser);

// Cette route permet de signaler le post d'un utilisateur
router.put('/flag/:postId', auth, postCtrl.flag);

// Cette route permet de désignaler le post d'un utilisateur
router.put('/unflag/:postId',auth, adminAuth, postCtrl.unflag);

//Fetch tous les posts signalés pour besoins de modération
router.get("/flagged",auth,adminAuth,postCtrl.getFlaggedPosts)


module.exports = router;