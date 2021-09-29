//Ce middleware sert à authentifier un admin pour réaliser une action réservée auc admins comme: unflag un post ou un commentaire
//Json web Token sert à vérifier les token des utilisateurs
const jwt = require('jsonwebtoken');

//Importation clé secrète de cryptage des tokens contenu dans le fichier .env.
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    try {
        console.log("demande d'authentification d'admin")
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey); //clé de cryptage. elle doit correspondre à la clé utilisée dans la fonction login.
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        console.log("token user ID: ", userId, "request user ID: ", req.body.userId, "role :", role )
        if (role != "admin") {
            res.status(401).json({message:"action réservée aux administrateurs"});
        } 
        else {
            console.log("admin authentifié")
            next(); /*Ce middleware est utilisé par d'autres middlewares avant de faire quoi que se soit. si l'authentification rate, alors il bloque le processus. Sinon il passe au middleware suivant.*/
         }
    } catch (error) {
        res.status(401).json({message:"authentification échouée"});
    }
};