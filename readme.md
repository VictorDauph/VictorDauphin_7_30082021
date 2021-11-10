Projet Groupomania:

Ce projet est un réseau social style 9gag, qui permet à des utilisateurs appartenant à une organisation de partager et de liker des images. La réalisation du projet englobe l'intégralité de l'application: création d'une base de données, du serveur beckend et de son API et du serveur frontend avec React.

Installation du serveur backend et de la Base de données:
La base de données utilisée pour ce projet est une base de donnée MYSQL. L'API pilote la base de donnée et son installation via Sequelize. Elle utilise des migrations pour créer les tables et les relations entre tables.

Pour faire fonctionner cette application en local il faut suivre les étapes suivantes:
A) Création de la base de données

B)Cloner le projet

C)Installer et configuer l'API

D)Installer le serveur REACT

-----------------------------------------------------------------------------------------------------------
A) Création base de données:

1) installer MySql sur votre machine.

2) Créer une Base de données MySql (name:BDDNAME)*

3) créer un utilisateur et lui donner tous les droits sur cette base de données (username:USERNAME, password:PASSWORD)*

*les noms indiqués sont des exemples, vous pouvez choisir les noms et mots de passes à votre convenance.

-------------------------------------------------------------------------------------------------------------------
B) Cloner l'application

1) Créer un repo git dans le dossier de votrer choix:

./: git init

2) cloner le projet avec le terminal depuis le dossier du projet:

./: git pull https://github.com/VictorDauph/VictorDauphin_7_30082021.git

------------------------------------------------------------------------------------------------------------------
C)Installer et configuer l'API

1) Installer les dépendances nécessaires au serveur backend, avec le terminal depuis le dossier backend: 

./cd backend 
./npm install

2) Créer le fichier "./backend/.env" . Ce fichier contient des variables d'environnement indispensables au fonctionnement de l'API. Exemple de contenu à copier coller dans le fichier .env:

PORT = 4000

SECRET_KEY = "SuuPthNrUjrN"

MAX_REQUESTS = 100

TOKEN_VALIDITY = "2h"

/!\ Dans la version actuelle du projet, il ne fonctionne que si le port du serveur backend est configuré sur le port 4000.

3) Créer le fichier ./backend/config/config.json (créez le dossier config si nécessaire) qui permet à l'API de se connecter à la base de donnée:

{
  "development": {
    "username": "USERNAME*",
    "password": "PASSWORD*",
    "database": "BDDNAME*",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

*(Il s'agit des valeurs que vous avez détéerminées lros de la création de la base de données.)


4) Créer les tables en utilisant les migrations. Avec le terminal, depuis le dossier backend:
sequelize db:migrate   

L'API devrait fonctionner correctement et avoir créés les tables dans la base de données.
Si la migration a bien fonctionnée la BDD contient une table comments, une tables posts etune table users.

5) Mise en route serveur backend:

depuis le dossier backend, dans le terminal:

nodemon server

si le serveur s'est bien lancé, votre terminal affiche:
Listening on port 3000
Executing (default): SELECT 1+1 AS result
INFO - Database connected.

----------------------------------------------------------------------------------------------------------------------------------------------------------------
D)Installer le serveur REACT(depuis un nouveau terminal)

1) depuis le dossier frontend installer les dépendances du serveur:

cd frontend
npm install

2) Lancer le serveur:
npm start

Au lancement du serveur une nouvelle page devrait s'ouvrir sur votre navigateur par défaut et afficher la page de login de l'appication.
Cette étape peut prendre quelques minutes.

------------------------------------------------------------------------------------------------------------------------------------------------------------

Relancer l'application une fois installée:
1) S'assurer que le service mySql est lancé:

2) lancer le serveur frontend:
cd frontend
npm start

3) lancer le serveur backend depuis un autre terminal:
cd backend
nodemon server
