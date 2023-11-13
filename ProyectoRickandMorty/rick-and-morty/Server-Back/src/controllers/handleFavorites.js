let myFavorites = [];
//const { Favorite } = require('../models/User')
const postFav = async (req, res) => {
    myFavorites.push(req.body)
    res.status(200).json(myFavorites);
    // const response = await Favorite.findOrCreate({
    //     where: req.body.id,
    //     defaults: req.body,
    // })
    // res.json(response)
}

const deleteFav = (req, res) => {
    const id = req.params.id;
    myFavorites = myFavorites.filter(fav => fav.id !== id)
    res.status(200).json(myFavorites)
}

module.exports = {
    postFav,
    deleteFav,
}