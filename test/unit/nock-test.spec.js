const config = require('config');
const nock = require('nock');
const request = require('supertest')('http://localhost:8081');
const {context} = config['server'];


describe('test nock', () => {

    it('should return a user', async (done) => {

        const expectResponse = {status: 'stopped'};

        nock('http://localhost:8081')
            .get(`${context}/health`)
            .reply(409, expectResponse);

        const {statusCode, body} = await request
            .get(`${context}/health`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send();

        expect(statusCode).toBe(409);
        expect(body).toEqual(expectResponse)
        done();
    });
})
