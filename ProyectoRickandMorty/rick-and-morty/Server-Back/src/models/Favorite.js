const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Favorite', {
      // idDB: {
      //    type: DataTypes.INTEGER,
      //    allowNull: false,
      //    primaryKey: true,
      //    autoIncrement: true,
      // },
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
         //defaultValue: DataTypes.UUIDV4,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM("Alive", "Dead", "unknown"),
         allowNull: false,
         defaultValue: "unknown",
      },
      species: {
         type: DataTypes.STRING,
         // values: [
         //    "Human",
         //    "Alien",
         //    "Humanoid",
         //    "Animal",
         //    "Poopybutthole",
         //    "Mytholog",
         //    "Robot",
         //    "Cronenberg",
         //    "Disease",
         //    "Parasite",
         //    "unknown"
         // ],
         allowNull: false,
         defaultValue: "unknown",

      },
      gender: {
         type: DataTypes.ENUM,
         values: ["Female", "Male", "Genderless", "unknown"],
         allowNull: false,
         defaultValue: "unknown",
      },
      origin: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      image: {
         type: DataTypes.STRING,//se guarda como string por que indica la ruta de ubicación de la imagen.
         allowNull: false,
      }
   }, { timestamps: false });
};
