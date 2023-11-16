require('dotenv').config();
const { Sequelize } = require('sequelize');
const FavoriteModel = require('../src/models/Favorite')
const UserModel = require('../src/models/User')
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


const URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
const sequelize = new Sequelize(
   URL,
   { logging: false, native: false }
);


FavoriteModel(sequelize)
UserModel(sequelize)


const { User, Favorite } = sequelize.models;
User.belongsToMany(Favorite, { through: "user_favorite" })
Favorite.belongsToMany(User, { through: "user_favorite" })


module.exports = {
   User,
   Favorite,
   conn: sequelize,
};
