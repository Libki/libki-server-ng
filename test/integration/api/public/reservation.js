'use strict';

process.env['DATABASE'] = 'test';

let request = require('supertest');
let should = require('should');

let knex = require('../../../../app/knex');
let server = require('../../../../server');

describe('loading express', function() {

    before('setting up test database schema', done => {
        knex.migrate.latest().then(done());
    });

    beforeEach('setting up test database data', function(done) {
        knex.seed.run().then(done());
    });

    afterEach('clear test data', function(done) {
        knex('reservations').del().then(done());
    })

    describe('POST /api/public/reservation', function() {
        it('respond with 400 if no site is passed', function(done) {
            request(server)
                .post('/api/public/reservation')
                .send({
                    // site: 'TestSiteA',
                    username: 'TestUser1',
                    password: 'password',
                    client_id: 1,
                })
                .expect(400, 'Parameter "site" not sent!', done);
        });

        it('respond with 400 if no username is passed', function(done) {
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    // username: 'TestUser1',
                    password: 'password',
                    client_id: 1,
                })
                .expect(400, 'Parameter "username" not sent!', done);
        });

        it('respond with 400 if no password is passed', function(done) {
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    username: 'TestUser1',
                    // password: 'password',
                    client_id: 1,
                })
                .expect(400, 'Parameter "password" not sent!', done);
        });

        it('respond with 400 if no client_id is passed', function(done) {
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    username: 'TestUser1',
                    password: 'password',
                    // client_id: 1,
                })
                .expect(400, 'Parameter "client_id" not sent!', done);
        });

        it('respond with 401 if invalid username is passed', function(done) {
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    username: 'TestUser1_invalid',
                    password: 'password',
                    client_id: 1,
                })
                .expect(401, 'Parameter "username" or "password" invalid!', done);
        });

        it('respond with 401 if invalid password is passed', function(done) {
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    username: 'TestUser1',
                    password: 'password_invalid',
                    client_id: 1,
                })
                .expect(401, 'Parameter "username" or "password" invalid!', done);
        });

        it('respond with 401 if invalid client_id is passed', function(done) {
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    username: 'TestUser1',
                    password: 'password',
                    client_id: 1234546789,
                })
                .expect(401, 'Parameter "client_id" invalid!', done);
        });

        it('respond with json representing the reservation', function(done) {
            let reservation = null;
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    username: 'TestUser1',
                    password: 'password',
                    client_id: 1,
                })
                .expect('Content-Type', 'application/json')
                .expect(function(res) {
                    reservation = res.body;
                    reservation.should.have.property('id').which.is.a.Number();
                    reservation.should.have.property('client_id').which.is.a.Number();
                    reservation.should.have.property('user_id').which.is.a.Number();
                })
                .expect(200, done);
        });

        it('respond with error on exact duplicate reservation', function(done) {
            let reservation = null;
            request(server)
                .post('/api/public/reservation')
                .send({
                    site: 'TestSiteA',
                    username: 'TestUser1',
                    password: 'password',
                    client_id: 1,
                })
                .expect('Content-Type', 'application/json')
                .expect(function(res) {
                    reservation = res.body;
                })
                .expect(200)
                .end(function(err, res) {
                    request(server)
                        .post('/api/public/reservation')
                        .send({
                            site: 'TestSiteA',
                            username: 'TestUser1',
                            password: 'password',
                            client_id: 1,
                        })
                        .expect('Content-Type', 'application/json')
                        .expect(function(res) {
                            res.body.should.have.property("success").which.is.a.Boolean();
                            res.body.should.have.property('reason').which.is.a.String();
                            res.body.reason.should.be.exactly('CLIENT_USER_ALREADY_RESERVED');
                        })
                        .expect(409, done);
                });
        });

        //FIXME: test CLIENT_ALREADY_RESERVED and USER_ALREADY_RESERVED

    });

});