'use strict';

process.env['DATABASE'] = 'test';

let request = require('supertest');
let should = require('should');

let knex = require('../../../../app/knex');
let server = require('../../../../server');

describe('loading express', function() {

    before('setting up test database schema', done => {
        knex.migrate.latest().then(() => {
            done();
        });
    });

    beforeEach('setting up test database data', function(done) {
        knex.seed.run().then(() => {
            done();
        });
    });

    describe('POST /api/client/register', function() {
        it('respond with 200 / client object json', function(done) {
            request(server)
                .post('/api/client/register')
                .set('Accept', 'application/json')
                .send({
                    'site': 'TestSite',
                    'name': 'TestName',
                    'location': 'TestLocation',
                })
                .expect('Content-Type', 'application/json')
                .expect(res => {
                    let client = res.body;

                    client.should.have.property('id').which.is.a.Number();
                    client.should.have.property('site').which.is.a.String();
                    client.should.have.property('location').which.is.a.String();

                    let date;

                    client.should.have.property('created_at').which.is.a.String();
                    date = new Date(client.created_at);
                    (date).should.eql(new Date(date.valueOf()));

                    client.should.have.property('updated_at').which.is.a.String();
                    date = new Date(client.updated_at);
                    (date).should.eql(new Date(date.valueOf()));
                })
                .expect(200, done);
        });

        it('respond with 400 if not "site" parameter is passed', function(done) {
            request(server)
                .post('/api/client/register')
                .send({
                    'name': 'TestName',
                })
                .expect(400, done);
        });

        it('respond with 400 if not "name" parameter is passed', function(done) {
            request(server)
                .post('/api/client/register')
                .send({
                    'site': 'TestSite',
                })
                .expect(400, done);
        });
    });
});
