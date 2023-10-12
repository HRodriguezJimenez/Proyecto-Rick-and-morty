const http = require('http');
const url = require('url');
const data = require('./utils/data');

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName.startsWith("/rickandmorty/character/")) {
        // Obtén el id del personaje de la URL
        const parts = pathName.split('/');
        const idCharacter = parts[parts.length - 1];
        const numeroId = parseInt(idCharacter, 10); // Convierte a número

        // Busca el personaje por ID
        const foundCharacter = data.find((character) => character.id === numeroId);

        if (foundCharacter) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(foundCharacter));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Personaje no encontrado');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no válida');
    }
}).listen(3001);

console.log('Servidor en ejecución en el puerto 3001');
