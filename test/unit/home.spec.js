const app = require('../../src/app');
const request = require('supertest')(app);
const pjson = require('../../package.json');

describe('APP SERVER', () => {

  it('Should be return status code 200 and welcome message in root', async (done) => {
    const { statusCode, text } = await request.get(`/`).send();
    expect(statusCode).toBe(200);
    expect(text).toEqual(`Welcome to server express - v${pjson['version']}`);
    done();
  });

});
