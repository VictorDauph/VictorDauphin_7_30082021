//importation de multure, package de gestion des fichiers
const multer = require('multer');

//dictionnaire des extensions de fichiers
const MIME_TYPES = { 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images') //images est le dossier de destination
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); //suppression des espaces
        const extension = MIME_TYPES[file.mimetype]; //définition des formats de fichiers supportés dans l'objet MIME_TYPES
        callback(null, name + Date.now() + '.' + extension ); //formatage du nom de fichier: nom du fichier d'origine + timestamp + . + extension
    }
});

module.exports = multer({storage}).single('image');