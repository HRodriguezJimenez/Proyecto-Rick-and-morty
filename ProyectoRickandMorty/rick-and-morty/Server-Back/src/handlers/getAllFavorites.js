const { Favorite } = require('../DB_connection')

const getAllFavorites = async () => {
    return await Favorite.findAll()
}

module.exports = getAllFavorites;