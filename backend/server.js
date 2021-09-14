// cette ligne sert à utiliser l'objet http qui sert à créer un serveur. Si on mets en Https, comment on ajoute un certificat de sécurité? Peut-être pas pertinent tout de suite.
const http = require('http'); 

//Cette ligne appelle le plugin dotenv qui sécurise l'environnement du serveur
require('dotenv').config()

//défini le port par défaut du serveur backend comme celui défini dans le fichier .env
const portenv = process.env.PORT;

//Cette ligne appelle le fichier app.js qui contient le framework Express et pilote le serveur
const app = require('./app');

//Cette fonction renvoie un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

//Cette ligne indique que le framework Express doit fonctionner sur le port indiqué
const port = normalizePort(process.env.PORT || portenv); //portenv est la variable PORT dans le fichier .env
app.set('port', port);

//error handler cherche les différentes erreures et les gère de manière appropriée
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

//Cette fonction est appelée à chaque fois qu'on envoie une requête au serveur. app correspond au framework express
const server = http.createServer(app);

//Cet écouteur d'évènements consigne le port sur lequel le server s'éxécute sur la console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//cette ligne sert à déterminer le port que le serveur doit écouter. process.env.port sert à utiliser le port fourni par l'environnement de développement. Port 3000 par défaut.
server.listen(port);