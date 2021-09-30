const Post = require("./post.js")
const User = require("./user")
const Comment = require("./comment")

//définition de la clé étrangère userId contenue dans la table Tweets et issue de la table user
User.hasMany(Post, { as: "Posts", foreignKey: "userId" });  
Post.belongsTo(User, {as: "Users", foreignKey: "userId"});
User.hasMany(Comment, { as: "comments", foreignKey: "userId" }); 
Comment.belongsTo(User, {as: "Users", foreignKey: "userId"});
Post.hasMany(Comment, { as: "comments", foreignKey: "postId" }); 
Comment.belongsTo(Post, {as: "Posts", foreignKey: "postId"});