const http = require('http');
const url = require('url');
const getCharById = require('./controllers/getCharById')


http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName.startsWith("/rickandmorty/character/")) {
        // Obtén el id del personaje de la URL
        const parts = pathName.split('/');
        const idCharacter = parts[parts.length - 1];
        const numeroId = parseInt(idCharacter, 10); // Convierte a número.
        
        getCharById(res, numeroId)    
    }
}).listen(3001);

console.log('Servidor en ejecución en el puerto 3001');