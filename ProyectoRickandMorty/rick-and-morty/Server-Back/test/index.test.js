const app = require('../src/app')
const session = require('supertest')
const agent = session(app)

describe('Test de RUTAS', () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        })

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1')
            expect(response.statusCode).toEqual(200)
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

    describe("GET /rickandmorty/login", () => { 
        it("si email y password son correctas retornar access: true", async () => {
            const response = await agent.get('/rickandmorty/login').
                query({email: 'haroldrod1@hotmail.com', password: '123456'})
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({access: true})
        })

        it("si email y password son incorrectas retornar access: false", async () => {
            const response = await agent.get('/rickandmorty/login').
                query({email: 'harol@hotmail.com', password: '654321'})
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({access: false})
        })
    })


})