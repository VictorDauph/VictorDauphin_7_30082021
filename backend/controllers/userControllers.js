//importation du package bcrypt pour cryptage mots de passe
const bcrypt = require('bcrypt');

//importation du package de génération de tokens
const jwt = require('jsonwebtoken');

//Importation clé secrète de cryptage des tokens contenu dans le fichier .env.
const secretKey = process.env.SECRET_KEY;

//Importation de la durée de validité d'un toker
const tokenValidity = process.env.TOKEN_VALIDITY;

//importation schéma de données utilisateur
const User = require('../models/user');

//importe le plugin password-validator
const passwordValidator = require('password-validator');

//créé un schéma de données pour mots de passes
const schemaPassword = require("../models/password")

//fonction de création de compte
exports.signup = (req, res, next) => {
    console.log("demande de création de compte",req.body.email,req.body.password)
    const passwordValidation = schemaPassword.validate(req.body.password)
    if (passwordValidation === true)
        {
            bcrypt.hash(req.body.password, 10) //méthode asynchrone de cryptage du mot de passe
            .then( hash => {
                const user = new User ({ //User est le schéma de données créé dans userModels, hash est le hash du mot de passe crée et crypté
                    email:req.body.email,
                    password: hash
                });
                user.save()
                .then(() => res.status(201).json({message: 'utilisateur créé'}))
                .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(500).json({error}));
        }
    else
        {
            const error = schemaPassword.validate(req.body.password, { list: true })
            res.status(428).json({error});
        } 

};

//Fonction de login utilisateur
exports.login = (req, res, next) => {
    const bodyEmail = req.body.email
    console.log("demande de login",bodyEmail,req.body.password)
    return User.findOne({where:{email: bodyEmail}})
    .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)
            .then( valid => {
                console.log("userId sending: ", user.userId)
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de pass invalide'})
                }
                res.status(200).json({
                    userId: user.userId,
                    token: jwt.sign(
                        { userId:user.userId}, //permet d'encoder l'information du user Id dans le token. Ce qui permettra de vérifier le user ID à la modification d'objets.
                        secretKey, //clé secrète d'encodage
                        { expiresIn: tokenValidity} //configuration d'expiration du token.
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status.status(500).json({ error }))
};

//fonction de suppression utilisateur.
exports.delete = (req, res, next) =>{
    console.log("authorized delete request")
    User.findOne({userId: req.params.userId})
    .then( user => { 
        user.destroy({
            where: {userId: req.params.userId}
            })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé'}))
        .catch(error => res.status(404).json({error}));
      })
    .catch(error => res.status(500).json({error})); 

  }; 