const axios = require('axios');

const URL = `https://rickandmortyapi.com/api/character/`;

const getCharById = (req, res) => {
  const id = req.params.id;// obtenemos al id del parametro de la solicitud.
  axios(`${URL}${id}`)
    .then((response) => {// la información que retorna en forma de object.
      if (response.data) {// en la prop data se encuentra la info que necesitamos.
        const characterData = {
          id,
          name: response.data.name,
          gender: response.data.gender,
          species: response.data.species,
          origin: response.data.origin.name,
          image: response.data.image,
          status: response.data.status,
        };
        res.status(200).json(characterData);
      } else {
        res.status(404).send('Not Found'); 
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message }); // enviamos un error accediendo a al prop message del object err.
    });
}

module.exports = getCharById;