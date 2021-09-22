//Json web Token sert à hacher
const jwt = require('jsonwebtoken');

//Importation clé secrète de cryptage des tokens contenu dans le fichier .env.
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    try {
        console.log("demande d'authentification")
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey); //clé de cryptage. elle doit correspondre à la clé utilisée dans la fonction login.
        const userId = decodedToken.userId;
        console.log("token user ID: ", userId, "request user ID: ", req.body.userId )
        if (req.body.userId && req.body.userId != userId){ // S'il y'a un user Id dans la requête et qu'il est différent de celui contenu dans le token
            throw 'User Id non valable';
        } else {
            next(); /*Ce middleware est utilisé par d'autres middlewares avant de faire quoi que se soit. si l'authentification rate, 
                        alors il bloque le processus. Sinon il passe au middleware suivant.*/
         }
    } catch (error) {
        res.status(401).json({error});
    }
};