const { Favorite } = require('../DB_connection')
const getAllFavorites = require('../handlers/getAllFavorites')


const postFav = async (req, res) => {
    try {
        const { id, name, origin, status, image, species, gender } = req.body;
        if(!id || !name || !origin || !status || !image || !species || !gender) 
        return res.status(401).send({ message: "Faltan datos" })
        await Favorite.findOrCreate({
            where: { name },
            defaults: { origin, status, image, species, gender }
        })
        const favorites = await getAllFavorites()
        res.status(201).send(favorites)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}


module.exports = postFav;