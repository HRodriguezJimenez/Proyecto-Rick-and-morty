const { Favorite } = require('../DB_connection')
const getAllFavorites = require('../handlers/getAllFavorites')


const postFav = async (req, res) => {
    try {
        const { id, name, origin, status, image, species, gender } = req.body;
        console.log(req.body);
        if(!id || !name || !origin || !status || !image || !species || !gender) 
        return res.status(401).json({ message: "Faltan datos" })
        await Favorite.findOrCreate({
            where: { id ,name },
            defaults: { origin, status, image, species, gender }
        })
        const favorites = await getAllFavorites()
        res.status(201).send(favorites)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = postFav;