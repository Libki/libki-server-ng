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

    describe('POST /api/client/login', function() {

        it('respond with 400 if invalid username is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSite',
                    'username': 'invalid',
                    'password': 'invalid',
                    'client_name': 'invalid',
                })
                .expect(400, 'Parameter "username" invalid!', done);
        });

        it('respond with 400 if no site is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'username': 'invalid',
                    'password': 'invalid',
                    'client_name': 'invalid',
                })
                .expect(400, 'Parameter "site" not sent!', done);
        });

        it('respond with 400 if no username is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSite',
                    'password': 'invalid',
                    'client_name': 'invalid',
                })
                .expect(400, 'Parameter "username" not sent!', done);
        });

        it('respond with 400 if no password is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSite',
                    'username': 'invalid',
                    'client_name': 'invalid',
                })
                .expect(400, 'Parameter "password" not sent!', done);
        });

        it('respond with 400 if no client_name is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSite',
                    'username': 'invalid',
                    'password': 'invalid',
                })
                .expect(400, 'Parameter "client_name" not sent!', done);
        });
    });
});
