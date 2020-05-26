const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => { //antes de executar cada um dos testes
        await connection.migrate.rollback(); //desfaz todas as migrations
        await connection.migrate.latest(); //refaz todas as migrations
    });

    afterAll(async () => {
        await connection.destroy();
    });


    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', '94eac607') //para pegar o que tem no header
            .send({
                    name: "APAD2",
                    email: "contato@gmail.com",
                    whatsapp: "47997343696",
                    city: "Joinville",
                    uf: "SC"
         });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});