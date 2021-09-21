//importation framework express
const express = require('express');

//chargement du middleware niveau router
const router = express.Router();

//importation du fichier controlleur
const saucesCtrl = require('../controllers/saucesController')

//importation du middleware d'authentification
const auth = require('../middleware/auth')
//importation du middleware de config multer (gestion fichiers)
const multer = require('../middleware/multer-config')

//Ce middleware créé une route POST pour liker et disliker les sauces
router.post('/:id/like', auth, saucesCtrl.likeSauce);

//Ce middleware créé une route POST pour ajouter des sauces. Il utilise le schéma de données Sauce comme une classe et le contenu de la requête pour créer une instance de Sauce.
router.post('/', auth, multer, saucesCtrl.createSauce);

//route put pour modification d'une sauce.
router.put ('/:id', auth, multer, saucesCtrl.modifySauce);

//route delete pour suppression d'une sauce.
router.delete('/:id', auth, saucesCtrl.deleteSauce );

//route get dynamique, pour que le front-end puisse aller chercher une sauce avec son identifiant. Les : indiquent à Express que cette partie de la route est dynamique
router.get('/:id', auth, saucesCtrl.getOneSauce );

// Cette route va chercher toutes les sauces pour les passer au frontend. Les sauces sont formatés selon ce qui est attendu par le front-end.
router.get('/', auth, saucesCtrl.getSauces);

module.exports = router;