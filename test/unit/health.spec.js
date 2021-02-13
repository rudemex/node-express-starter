const config = require('config');
const app = require('../../src/app');
const request = require('supertest')(app);

const { context } = config['server'];

describe('HEALTH', () => {
  it('Should be return status message UP and status code 200 in healthcheck', async (done) => {
    const { statusCode, body } = await request
        .get(`${context}/health`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send();
    expect(statusCode).toBe(200);
    expect(body.status).toEqual('UP');
    done();
  });
});
