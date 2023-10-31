const axios = require('axios');

const URL = `https://rickandmortyapi.com/api/character/`;

const getCharById = async (req, res) => {
  const id = req.params.id;// obtenemos el id del parametro de la solicitud.//* destructurar ?
  try {
    const response = await axios(`${URL}${id}`);//* agregar .get()
    if (response.data) {// en la prop data se encuentra la info que necesitamos.//* destructurar ?
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
    } else {// manejamos un error que se presente por lado del cliente.
      res.status(404).send('Not Found'); 
    }
  } catch (error) {// manejamos un error del lado del servidor.
    res.status(500).send({ message: error.message });
  }
}

module.exports = getCharById;