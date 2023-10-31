const app = require('../src/app')
const session = require('supertest')
const agent = session(app)

describe('Test de RUTAS', () => {
    // Test para validar si obtenemos el personaje deseado al solicitarlo.
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        })
        
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1')// agent.get('/rickandmorty/character/1') realiza una petición a la api.

            expect(response.statusCode).toEqual(200)// validamos lo que debe contener la respuesta.
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");
            expect(response.body).toHaveProperty("species");
            expect(response.body).toHaveProperty("gender");
            expect(response.body).toHaveProperty("status");
            expect(response.body).toHaveProperty("origin");
            expect(response.body).toHaveProperty("image");
        })

        it('Si hay un error responde con status: 500', async () => {
            const res = await agent.get('/rickandmorty/character/999');
            expect(res.statusCode).toBe(500);
        })
    });

    // Test para validar que la ruta login funcione correctamente.
    describe("GET /rickandmorty/login", () => { 
        it("si email y password son correctas retornar access: true", async () => {
            const response = await agent.get('/rickandmorty/login').
                query({email: 'haroldrod1@hotmail.com', password: '123456'})//enviamos un usuario valido.
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({access: true})
        })

        it("si email y password son incorrectas retornar access: false", async () => {
            const response = await agent.get('/rickandmorty/login').
                query({email: 'harol@hotmail.com', password: '654321'})//enviamos un usuario invalido.
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({access: false})
        })
    })

    describe("POST /rickandmorty/fav", () => {
        it("Debe agregar un favorito y devolver un arreglo con el favorito", async () => {
            const response = await agent.post("/rickandmorty/fav").
                send({ id: 1, name: 'Favorito 1' })// usamos send para enviar el cuerpo de la solicitud.
                expect(response.statusCode).toBe(200)
                expect(response.body).toContainEqual({ id: 1, name: 'Favorito 1' })// verificamos que el arreglo contenga el NUEVO favorito.
        })

        it("Debe agregar un favorito al arreglo existente", async () => {
            await agent.post("/rickandmorty/fav").send({ id: 1, name: 'Favorito 1' })// agregamos un favorito
            const response = await agent.post("/rickandmorty/fav").send({ id: 2, name: 'Favorito 2' })// agregamos un NUEVO favorito.
            expect(response.statusCode).toBe(200)
            expect(response.body).toContainEqual({ id: 2, name: 'Favorito 2' })// verificamos que el arreglo contenga el NUEVO favorito y el anterior.
        })

        describe("DELETE /rickandmorty/fav/:id", () => {
            
            it("Debe devolver un arreglo sin cambios cuando no se encuentra el ID", async () => {
                // Agregamos un favorito previamente.
                await agent.post("/rickandmorty/fav").send({ id: 1, name: 'Harold' });
          
                const response = (await agent.delete("/rickandmorty/fav/2")); // Intentamos eliminar un ID que no existe.
          
                expect(response.statusCode).toBe(200);
                expect(response.body).toContainEqual({ id: 1, name: 'Harold' }); // verificamos que el arreglo no haya cambiado.
            });
          
            it("Debe eliminar un favorito y devolver un arreglo actualizado cuando se encuentra el ID", async () => {
                // Agregamos un favorito previamente.
                await agent.post("/rickandmorty/fav").send({ id: 1, name: 'Favorito 1' })
                await agent.post("/rickandmorty/fav").send({ id: 2, name: 'Favorito 2' });
          
                const response = await agent.delete("/rickandmorty/fav/2"); // Eliminamos un ID que existe.
          
                expect(response.status).toBe(200);
                expect(response.body).toContainEqual({ id: 1, name: 'Favorito 1' }); // Debemos verificar que el arreglo esté actualizado después de la eliminación.
            });
        })
    })
})

/*//? Diferencia de envio de información con await.

//* const response = await agent.post("/rickandmorty/fav").send({ id: 2, name: 'Favorito 2' });
De esta manera: Con agent.post() simulamos la petición a la appi y con .send() le enviamos información a la appi.
La respuesta la encontramos en response.body.


//* const response = (await agent.delete("/rickandmorty/fav/2"));
Al encerrar la simulación de la petición entre () enviamos de una vez la información.
La respuesta la encontramos en response.body


//* const response = (await agent.delete("/rickandmorty/fav/2")).body;
Al encerrar la simulación de la petición entre () enviamos de una vez la información y al agregar .body accedemos de una vez a la ubicación de la información.
La respuesta la encontramos en response

*/