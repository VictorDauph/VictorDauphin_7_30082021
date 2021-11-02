//Cette ligne importe les schéma de donnée Posts
const Comment= require('../models/comment');

//cette fonction sert à créer des commentaires.
exports.createComment = (req, res, next) =>{
    console.log("demande de création de commentaire autorisée")
      const commentObject = req.body;
      console.log("création du commentaire", commentObject)
      const comment = new Comment ({
        ...commentObject, //Cet opérateur est capable de créer automatiquement un objet à partir de l'objet commentaire et des données contenues dans la requête.
      });
      comment.save() //Save est une méthode des schémas de données qui sauvegarde un objet dans la base.
      .then(() => res.status(201).json({message: 'commentaire enregistré'}))
      .catch(error => res.status(400).json({error}));  
    };

    //fonction de suppression d'un commentaire
  exports.deleteComment = (req, res, next) =>{
    console.log("demande de suppression du commentaire : ", req.params.commentId)
    return Comment.findOne({ where: {commentId: req.params.commentId }}) //on cherche l'objet dans la base de données
    .then( comment => {
          comment.destroy({ where: {commentId: req.params.commentId }})
          .then(() => res.status(200).json({ message: 'commentaire supprimé'}))
          .catch(error => res.status(404).json({"message":error}));
    })
    .catch(error => res.status(500).json({"message":error}));
  }; 

  //fonction de modification de commentaire
  exports.modifyComment = (req,res,next) =>{
    console.log("demande de modification de commentaire :", req.params.commentId)
    Comment.findOne({ where: {commentId: req.params.commentId }})
    .then(comment => {
        console.log("comment found")
      comment.content = req.body.content;
      console.log("comment content: ",comment.content)
      comment.save();
      res.status(201).json({"message":"comment "+ req.params.commentId +" modified"})
    })
    .catch(error => res.status(404).json({"message":error}));
  }

  //fonction de signalement de commentaire
  exports.flag = (req,res,next) =>{
    console.log("demande de signalement du post :", req.params.commentId)
    Comment.findOne({ where: {commentId: req.params.commentId }})
    .then(comment => {
        comment.flagged = true;
        comment.save();
      res.status(201).json({"message":"comment "+ req.params.commentId +" flagged"})
    })
    .catch(error => res.status(404).json({"message":error}));
  }

  //fonction de désignalement de commentaire
  exports.unflag = (req,res,next) =>{
    console.log("demande de désignalement du post :", req.params.commentId)
    Comment.findOne({ where: {commentId: req.params.commentId }})
    .then(comment => {
        comment.flagged = false;
        comment.save();
      res.status(201).json({"message":"comment "+ req.params.commentId +" unflagged"})
    })
    .catch(error => res.status(404).json({"message":error}));
  }

  // Fonction de récupération de tous les commentaires d'un post
exports.getCommentsFromPost = (req, res, next) =>{
    Comment.findAll({ where: {postId: req.params.postId }}) //_id est le champs de l'objet thing évalué, req.params.id est la valeur recherchée passée par la requête HTTP (:id). On va donc regarder tous les objets dans la BDD et chercher celui qui a le bon ID.
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(404).json({message:error}));
  };

    // Fonction de récupération des commentaires signalés
  exports.getFlaggedComments = (req, res, next) =>{
    Comment.findAll({ where: {flagged:true }}) //Chercher tous les comments flaggés
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(404).json({message:error}));
  };

      // Fonction de récupération d'un commentaire pour admin
      exports.getOneComment = (req, res, next) =>{
        Comment.findOne({ where: {commentId: req.params.commentId }}) //Chercher un commentaire par son Id
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({message:error}));
      };