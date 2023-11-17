const axios = require('axios')

const URL = `https://rickandmortyapi.com/api/character/`;

const randomCharacter = async (req, res) => {
    try {
        const responseInfo = await axios(`${URL}`)

        const pages = responseInfo.data.info.pages;//en la data que envia la api lo retorna en un objeto que tiene la propiedad "info" que es un objeto que contiene la propiedad "pages" con la cantidad de pagínas que contiene la api. 
        const randomPage = Math.floor(Math.random() * pages) + 1;

        const responsePage = await axios(`${URL}?page=${randomPage}`)//realizamos la solicitud de una pagína aleatoria de la api. Cada pag contiene mas o menos 20 personajes.
        const characters = responsePage.data.results;// en la propiedad "results" estan los personajes.

        const randomId = Math.floor(Math.random() * characters.length)
        const randomCharacter = characters[randomId];//seleccionamos un id aleatorio de lo personajes.        
       
        const characterData = {
            id: randomCharacter.id,
            name: randomCharacter.name,
            gender: randomCharacter.gender,
            species: randomCharacter.species,
            origin: randomCharacter.origin.name,
            image: randomCharacter.image,
            status: randomCharacter.status,
        };
        
        res.status(200).send(characterData);
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = randomCharacter;