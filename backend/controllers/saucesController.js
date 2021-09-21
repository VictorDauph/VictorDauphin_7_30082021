//Cette ligne importe les schéma de donnée Sauce dans saucesModels.js
const Sauce= require('../models/saucesModels');

//Cette ligne importe file system, qui permet de gérer des fichiers (notemment pour la suppression d'images du dossier images)
const fs = require('fs');

//cette fonction sert à liker et disliker les sauces
exports.likeSauce= (req, res, next) =>{
  const likevalue = req.body.like;
  const userId = req.body.userId;
  console.log(req.body)
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    let newUsersLiked = sauce.usersLiked;
    const newUsersDisliked = sauce.usersDisliked;
    if (likevalue == 1)
      {
        newUsersLiked.push(userId)
        const newLikes = newUsersLiked.length
        console.log("newlikes",newLikes,"newUsersLiked",newUsersLiked)
        Sauce.updateOne({_id: req.params.id},{
          likes: newLikes,
          usersLiked: newUsersLiked
        }) 
      .then(()=> res.status(200).json({message: 'sauce likée'}))
      .catch(error => res.status(400).json({error}));
      }
    else if (likevalue == 0)
      {
        const indexToRemoveFromLikes = newUsersLiked.indexOf(userId)
        if (indexToRemoveFromLikes !== -1 )
          {newUsersLiked.splice(indexToRemoveFromLikes,1)}
        const newLikes = newUsersLiked.length
        const indexToRemoveFromDislikes = newUsersDisliked.indexOf(userId)
        if (indexToRemoveFromDislikes !== -1 )
          {newUsersDisliked.splice(indexToRemoveFromDislikes,1)}
        console.log("indexdislikes",indexToRemoveFromDislikes,"indexlikes",indexToRemoveFromLikes)
        const newDislikes = newUsersDisliked.length
        Sauce.updateOne({_id: req.params.id},{
          likes: newLikes,
          dislikes: newDislikes,
          usersLiked: newUsersLiked,
          usersDisliked: newUsersDisliked
        })
        .then(()=> res.status(200).json({message: 'like/dislike supprimé'}))
        .catch(error => res.status(400).json({error})); 
      }
    else if (likevalue == -1) 
      {
        newUsersDisliked.push(userId)
        const newDislikes = newUsersDisliked.length
        console.log("newdislikes",newDislikes,"newUsersDisliked",newUsersDisliked)
        Sauce.updateOne({_id: req.params.id},{
          dislikes: newDislikes,
          usersDisliked: newUsersDisliked
      })
      .then(()=> res.status(200).json({message: 'sauce dislikée'}))
      .catch(error => res.status(400).json({error}));
      }
  })
  .catch(error => res.status(500).json({error}));
  
} 

//cette fonction sert à créer des objets et est exportée pour le fichier router stuff.js
 exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; //il faut supprimer l'id généré par le front, car on souhaite conserver l'ID généré par Mongoose.
    const sauce = new Sauce ({
      ...sauceObject, //Cet opérateur est capable de créer automatiquement un objet à partir de l'objet Sauce et des données contenues dans la requête.
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes : 0,
      dislikes : 0,
      usersLiked : [],
      usersdisLiked : []
    });
    sauce.save() //Save est une méthode des schémas de données qui sauvegarde un objet dans la base.
    .then(() => res.status(201).json({message: 'objet enregistré'}))
    .catch(error => res.status(400).json({error}));
  };


//Fonction de modification de sauces
  exports.modifySauce =  (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id}) 
    .then( sauce => {
      if (req.file != undefined)
        { 
          const filename = sauce.imageUrl.split('/images')[1]
          console.log('image à supprimer',filename);
          fs.unlink(`images/${filename}`, (err => {
            if (err) console.log(err);
            else {
              //console.log(filename, "deleted");
            }}))}
    const sauceObject = req.file ? // ? est l'opérateur ternaire, il vérifie l'existence de req.file
    { 
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //Si le fichier existe on parse le requête et on génère une URL pour l'image.
    } : 
    {...req.body}; //si le fichier n'existe pas on fait simplement une copie de req.body
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id}) //update one prend 2 arguments. Le 1er c'est l'objet de comparaison, celui dont l'id est envoyé via la requête HTTP. Le 2ème c'est le nouvel objet. On doit réassigner le bon id pour être sûr d'avoir toujours le bon.
      .then(()=> res.status(200).json({message: 'objet modifié'}))
      .catch(error => res.status(400).json({error}));
    
    }) 

    .catch(error => res.status(500).json({error})) 
  }; 



//fonction de suppression d'objets
  exports.deleteSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id}) //on cherche l'objet dans la base de données
    .then( sauce => {
      const filename = sauce.imageUrl.split('/images')[1] //filename récupère le nom du fichier à supprimer
      fs.unlink(`images/${filename}`, ()=> { //fs.unlink supprime le fichier image, puis le callback supprime l'objet
        Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: 'sauce supprimée'}))
        .catch(error => res.status(404).json({error}));
      })
    })
    .catch(error => res.status(500).json({error}));

  }; 

// Fonction de récupération d'un objet unique
exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({_id: req.params.id}) //_id est le champs de l'objet thing évalué, req.params.id est la valeur recherchée passée par la requête HTTP (:id). On va donc regarder tous les objets dans la BDD et chercher celui qui a le bon ID.
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
  };

//Fonction de récupération de tous les objets
exports.getSauces = (req, res, next) => {
    Sauce.find() //Sauce.find va chercher tous les objets Thing de la base de données et les retourner.
    .then(sauces => res.status(200).json(sauces)) //things, c'est tous les objets Thing trouvés dans la BDD qui sont retournés, un par un, jusqu'à ce qu'ils soient tous retournés.
    .catch(error => res.status(400).json({error}));
    }