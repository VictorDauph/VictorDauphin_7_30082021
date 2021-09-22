//Json web Token sert à hacher
const jwt = require('jsonwebtoken');

//Importation clé secrète de cryptage des tokens contenu dans le fichier .env.
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    try {
        console.log("Vérification de l'utilisateur")
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey); //clé de cryptage. elle doit correspondre à la clé utilisée dans la fonction login.
        const userId = decodedToken.userId;
        console.log("token user ID: ", userId, "http request id: ", req.params.id )
        
        if (req.params.id != userId){ // Si l'userId passé par la requête http est différent de celui contenu dans le token
            throw 'Action non autorisée pour cet utilisateur';
        } else {
            next(); /*Ce middleware est utilisé par d'autres middlewares avant de faire quoi que se soit. si l'authentification rate, 
                        alors il bloque le processus. Sinon il passe au middleware suivant.*/
         } 
    } catch (error) {
        res.status(401).json({error});
    }
};