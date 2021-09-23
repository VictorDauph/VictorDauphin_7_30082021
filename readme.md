Projet Groupomania:

Ce projet est un réseau social style 9gag, qui permet à des utilisateurs appartenant à une organisation de partager et de liker des images. Le projet a été réalisé du débutà la fin: création d'une base de données, du serveur beckend et de son API et du serveur frontend.

Installation du serveur backend et de la Base de données:
La base de données utilisée pour ce projet est une base de donnée MYSQL. L'API pilote la base de donnée et son installation via Sequelize. Elle utilise des migrations pour créer les tables et les relations entre tables.

Pour faire fonctionner cette application en local il faut suivre les étapes suivantes:
Création base de données:
1) installer MySql sur votre machine.
2) Créer une Base de données MySql (name:BDDNAME)*
3) créer un utilisateur qui a tous les droits sur cette base de données (username:USERNAME, password:PASSWORD)*
*les noms indiqués sont des exemples, vous pouvez choisir les noms et mots de passes à votre convenance.

Cloner l'API
1) Créer un repo git dans le dossier de votrer choix:
git init

2) cloner le projet avec le terminal depuis le dossier du projet:
git pull https://github.com/VictorDauph/VictorDauphin_7_30082021.git

3) Installer les dépendances nécessaires au serveur backend, avec le terminal depuis le dossier backend: 
npm install
4)Créer le fichier "./backend/.env" . Ce fichier contient des variables d'environnement indispensables au fonctionnement de l'API. Exemple de contenu à copier coller dans le fichier .env:

PORT = 3000
SECRET_KEY = "SuuPthNrUjrN"
MAX_REQUESTS = 100
TOKEN_VALIDITY = "2h"

5) Créer le fichier ./backend/config/config.json qui permet à l'API de se connecter à la base de donnée:

{
  "development": {
    "username": "USERNAME",
    "password": "PASSWORD",
    "database": "BDDNAME",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

6) Créer les tables en utilisant les migrations. Avec le terminal, depuis le dossier backend:
sequelize db:migrate   

L'API devrait fonctionner correctement et avoir créés les tables dans la base de données.

Mise en route serveur backend:

depuis le dossier backend, dans le terminal:

nodemon server

