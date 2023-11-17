const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Favorite', {

      id: {
         type: DataTypes.STRING,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM("Alive", "Dead", "unknown"),
         //allowNull: false,
         defaultValue: "unknown",
      },
      species: {
         type: DataTypes.STRING,
         //allowNull: false,
         defaultValue: "unknown",

      },
      gender: {
         type: DataTypes.ENUM,
         values: ["Female", "Male", "Genderless", "unknown"],
         //allowNull: false,
         defaultValue: "unknown",
      },
      origin: {
         type: DataTypes.STRING,
         //allowNull: false,
      },
      image: {
         type: DataTypes.STRING,//se guarda como string por que indica la ruta de ubicación de la imagen.
         //allowNull: false,
      }
   }, { timestamps: false });
};
