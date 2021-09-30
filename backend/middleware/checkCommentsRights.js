//Ce middleware vérifie qu'un post est bien manipulé par son propriétaire ou par un admin.
const Comment= require('../models/comment');

//jwt vérifie les tokens
const jwt = require('jsonwebtoken');

//Importation clé secrète de cryptage des tokens contenu dans le fichier .env.
const secretKey = process.env.SECRET_KEY;


module.exports = (req, res, next) => {
    console.log("demande d'action sur le commentaire : ", req.params.commentId)
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey); //clé de cryptage. elle doit correspondre à la clé utilisée dans la fonction login.
    const role = decodedToken.role;
    const tokenUserId = decodedToken.userId;
    return Comment.findOne({ where: {commentId: req.params.commentId }}) //on cherche l'objet dans la base de données
    .then(comment =>{
        const commentUserId= comment.userId
        if( commentUserId==tokenUserId || role == "admin")
        {
            next()
        }
        else{
            res.status(401).json({message:"Utilisateur non autorisé à manipuler ce commentaire"});
        }
    })
}