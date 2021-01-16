const request = require('supertest');
const app  = require('../src/app');

const pjson = require('../package.json');

describe('Endpoint root', () => {
  it('Should be return status 200', async () => {
    const result = await request(app).get(`/`).send();
    expect(result.status).toBe(200);
  });

  it('Should be return message and version', async () => {
    const result = await request(app).get(`/`).send();
    expect(result.text).toEqual(`Welcome to server express - v${pjson['version']}`);
  });
});
