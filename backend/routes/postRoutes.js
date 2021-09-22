//importation framework express
const express = require('express');

//chargement du middleware niveau router
const router = express.Router();

//importation du fichier controlleur
const postCtrl = require('../controllers/postController')

//importation du middleware d'authentification
const auth = require('../middleware/auth')

//importation du middleware de vérification des droits utilisateurs
const checkUser = require("../middleware/checkUser")

//importation du middleware de config multer (gestion fichiers)
const multer = require('../middleware/multer-config')

//Ce middleware créé une route POST pour liker et disliker les posts
//router.post('/:id/like', auth, postCtrl.likePost);

//Ce middleware créé une route POST pour ajouter des sauces. Il utilise le schéma de données Post comme une classe et le contenu de la requête pour créer une instance de Post.
router.post('/', auth, multer, postCtrl.createPost);

//route put pour modification d'un post.
//router.put ('/:id', auth, multer, saucesCtrl.modifyPost);

//route delete pour suppression d'un post
router.delete('/:postId/:userId',auth,checkUser,postCtrl.deletePost );

//route get dynamique, pour que le front-end puisse aller chercher tous les posts d'un utilisateur. Les : indiquent à Express que cette partie de la route est dynamique
//router.get('/:id', auth, postCtrl.getPostsFromUser );

// Cette route va chercher tous les posts pour les passer au frontend. Les posts sont formatés selon ce qui est attendu par le front-end.
//router.get('/', auth, postCtrl.getPosts);

module.exports = router;