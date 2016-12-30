'use strict';

process.env['DATABASE'] = 'test';

let request = require('supertest');
let should = require('should');

let knex = require('../../../../app/knex');
let server = require('../../../../server');

let Statistic = require('../../../../app/models/statistic');

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
        it('respond with 200 / json if login is allowed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSiteA',
                    'username': 'TestUser1',
                    'password': 'password',
                    'client_name': 'TestClient1',
                })
                .expect(async res => { // Ensure statistic line was created
                    let statistic = await Statistic
                        .where('client_name', 'TestClient1')
                        .where('client_location', 'TestLocationX')
                        .where('site', 'TestSiteA')
                        .where('username', 'TestUser1')
                        .where('action', 'LOGIN')
                        .fetch();

                    statistic.should.have.property('id').which.is.a.Number();
                })
                .expect(200, done);
        });

        it('respond with 401 if invalid password is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSiteA',
                    'username': 'TestUser1',
                    'password': 'invalid',
                    'client_name': 'TestClient1',
                })
                .expect(401, 'Parameter "password" invalid!', done);
        });

        it('respond with 401 if invalid username is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSiteA',
                    'username': 'invalid',
                    'password': 'password',
                    'client_name': 'TestClient1',
                })
                .expect(401, 'Parameter "username" invalid!', done);
        });

        it('respond with 401 if invalid client name is passed', function(done) {
            request(server)
                .post('/api/client/login')
                .send({
                    'site': 'TestSite',
                    'username': 'TestUser1',
                    'password': 'password',
                    'client_name': 'invalid',
                })
                .expect(401, 'Parameter "client_name" invalid!', done);
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
