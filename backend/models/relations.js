const Post = require("./post.js")
const User = require("./user")

//définition de la clé étrangère userId contenue dans la table Tweets et issue de la table user
User.hasMany(Post, { as: "Posts", foreignKey: "userId" });  
Post.belongsTo(User, {as: "Users", foreignKey: "userId"});