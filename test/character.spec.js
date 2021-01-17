const request = require('supertest');
const config = require('config');
const app  = require('../src/app');

const serverConfig = config['server'];

describe('Endpoint Character', () => {
  it('Should be return all characters', async () => {
    const result = await request(app).get(`${serverConfig['context']}/character`).send();
    expect(result.status).toBe(200);
    expect(result.body).not.toBeEmpty();
  });
});
