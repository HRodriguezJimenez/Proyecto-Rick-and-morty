const { Favorite } = require('../DB_connection')
const getAllFavorites = require('../handlers/getAllFavorites')


const deleteFav = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Favorite.destroy({
            where: { id },
        })
        if (!response) {
            return res.send({ message: "El personaje no se pudo eliminar" })
        } else {
            const favorites = await getAllFavorites()
            return res.status(201).send(favorites)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })    
    }
}


module.exports = deleteFav;