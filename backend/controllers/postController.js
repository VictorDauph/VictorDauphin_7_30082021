//Cette ligne importe les schéma de donnée Posts
const Post= require('../models/post');

//Cette ligne importe file system, qui permet de gérer des fichiers (notemment pour la suppression d'images du dossier images)
const fs = require('fs');


//cette fonction sert à liker et disliker les posts
exports.likePost= (req, res, next) =>{
  console.log("like request body :", req.body)
  const userId= req.body.userId;
  const postId= req.params.postId;
  const likevalue = req.body.like;
  console.log("demande de like autorisée, Post: ",postId, "user:",userId, "like value :", likevalue)
  Post.findOne({where : {postId:postId}})
  .then(post => {
    let newUsersLiked = JSON.parse(post.usersUpvotes);
    let newUsersDisliked = JSON.parse(post.usersDownvotes);
    console.log("usersLiked before", typeof newUsersLiked)
    console.log("includes?", newUsersLiked.includes(userId),newUsersDisliked.includes(userId) )
    if (likevalue == 1 && newUsersDisliked.includes(userId)==false && newUsersLiked.includes(userId)==false )
      {
        console.log("trying to like")
        newUsersLiked.push(userId)
        console.log("newUsersLiked",newUsersLiked)
        Post.update(
          {usersUpvotes: JSON.stringify(newUsersLiked)},
          {where : {postId:postId}}
          ) 
        .then(()=> res.status(200).json({message: 'post liké'}))
        .catch(error => res.status(400).json({message:"echec like"}));
      }
    else if (likevalue == 0 && (newUsersDisliked.includes(userId) || newUsersLiked.includes(userId)) )
      {
        const indexToRemoveFromLikes = newUsersLiked.indexOf(userId)
        if (indexToRemoveFromLikes !== -1 )
          {
            newUsersLiked.splice(indexToRemoveFromLikes,1)
            console.log("newUsersLiked",newUsersLiked)
          }
        const indexToRemoveFromDislikes = newUsersDisliked.indexOf(userId)
        if (indexToRemoveFromDislikes !== -1 )
          {
            newUsersDisliked.splice(indexToRemoveFromDislikes,1)
            console.log("newUsersDisliked",newUsersDisliked)
          }
        console.log("indexdislikes",indexToRemoveFromDislikes,"indexlikes",indexToRemoveFromLikes)
        Post.update(
          {
          usersUpvotes: JSON.stringify(newUsersLiked),
          usersDownvotes: JSON.stringify(newUsersDisliked)
        },
        {where : {postId:postId}}
        )
        .then(()=> res.status(200).json({message: 'like/dislike supprimé'}))
        .catch(error => res.status(400).json({message:error})); 
      }
      else if (likevalue == -1 && newUsersDisliked.includes(userId)==false && newUsersLiked.includes(userId)==false)
      {
        console.log("trying to Dislike. Disliked array :", typeof newUsersDisliked)
        newUsersDisliked.push(userId)
        console.log("newUsersDisliked",newUsersDisliked)
        Post.update(
          {usersDownvotes: JSON.stringify(newUsersDisliked)},
          {where : {postId:postId}}
          ) 
        .then(()=> res.status(200).json({message: 'post disliké'}))
        .catch(error => res.status(400).json({message:error}));
      }
      else{res.status(400).json({message:"valeur de like non acceptée"})}
  })
  .catch(error => res.status(500).json({message:"echec like/dislike, post introuvable"}));
} 


//cette fonction sert à créer des posts et est exportée pour le fichier router postRoutes.js
 exports.createPost = (req, res, next) =>{
  console.log("demande de création de post autorisée")
    const postObject = req.body;
    console.log("création du post", postObject)
    const post = new Post ({
      ...postObject, //Cet opérateur est capable de créer automatiquement un objet à partir de l'objet Post et des données contenues dans la requête.
      //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //sert à créer une URL selon les méthodes propres à Multer, désactiver pour des tests avec Postman, activer pour la gestion d'images
      usersLiked : [],
      usersdisLiked : []
    });
    post.save() //Save est une méthode des schémas de données qui sauvegarde un objet dans la base.
    .then(() => res.status(201).json({message: 'objet enregistré'}))
    .catch(error => res.status(400).json({error}));  
  };

//fonction de suppression des posts
  exports.deletePost = (req, res, next) =>{
    console.log("demande de suppression du post : ", req.params.postId)
    return Post.findOne({ where: {postId: req.params.postId }}) //on cherche l'objet dans la base de données
    .then( post => {
        /*
        const filename = post.imageUrl.split('/images')[1] //filename récupère le nom du fichier à supprimer
        fs.unlink(`images/${filename}`, ()=> { //fs.unlink supprime le fichier image, puis le callback supprime l'objet, à intégrer une fois qu'on pourra envoyer des fichiers images
        */
          post.destroy({ where: {postId: req.params.postId }})
          .then(() => res.status(200).json({ message: 'post supprimé'}))
          .catch(error => res.status(404).json({error}));
        /*}) La fonction de suppression de l'image sera à gérer une fois l'envoie d'objet côte front implémenté*/
    })
    .catch(error => res.status(500).json({error}));

  }; 


// Fonction de récupération d'un post unique
exports.getOnePost = (req, res, next) =>{
    Post.findOne({ where: {postId: req.params.postId }}) //_id est le champs de l'objet thing évalué, req.params.id est la valeur recherchée passée par la requête HTTP (:id). On va donc regarder tous les objets dans la BDD et chercher celui qui a le bon ID.
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({"message":error}));
  };

// Fonction de récupération de tous les posts d'un utilisateur
exports.getPostsFromUser = (req, res, next) =>{
  Post.findAll({ where: {userId: req.params.GetFromUserId }}) //_id est le champs de l'objet thing évalué, req.params.id est la valeur recherchée passée par la requête HTTP (:id). On va donc regarder tous les objets dans la BDD et chercher celui qui a le bon ID.
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(404).json({error}));
};

//Fonction de récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
    Post.findAll() //Sauce.find va chercher tous les objets posts de la base de données et les retourner.
    .then(posts => res.status(200).json(posts)) 
    .catch(error => res.status(400).json({error}));
    }

//Fonction de signalement d'un post
exports.flag = (req,res,next) =>{
  console.log("demande de signalement du post :", req.params.postId)
  Post.findOne({ where: {postId: req.params.postId }})
  .then(post => {
    post.flagged = true;
    post.save();
    res.status(201).json({"message":"post "+ req.params.postId +" flagged"})
  })
  .catch(error => res.status(404).json({"message":"post introuvable"}));
}

//Fonction de désignalement d'un post
exports.unflag = (req,res,next) =>{
  console.log("demande de désignalement du post :", req.params.postId)
  Post.findOne({ where: {postId: req.params.postId }})
  .then(post => {
    post.flagged = false;
    post.save();
    res.status(201).json({"message":"post "+ req.params.postId +" unflagged"})
  })
  .catch(error => res.status(404).json({"message":"post introuvable"}));
}

// Fonction de récupération des posts signalés
exports.getFlaggedPosts = (req, res, next) =>{
  Post.findAll({ where: {flagged:true }}) //Chercher tous les comments flaggés
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(404).json({message:error}));
};