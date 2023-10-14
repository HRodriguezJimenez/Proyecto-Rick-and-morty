const axios = require('axios');

function getCharById(res, id) {
  
  axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      // Extrae los datos relevantes del personaje
      const characterData = {
        id,
        name: response.data.name,
        gender: response.data.gender,
        species: response.data.species,
        origin: response.data.origin.name,
        image: response.data.image,
        status: response.data.status,
      };

      // Devuelve la respuesta en formato JSON con status 200
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(characterData));
    })
    .catch((error) => {
        // Maneja errores
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.message);
    });
}

module.exports = getCharById;
