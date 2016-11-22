'use strict';

process.env['DATABASE'] = 'test';

let request = require('supertest');
let should = require('should');

let knex = require('../../../../app/knex');
let server = require('../../../../server');

describe('loading express', function() {

    beforeEach('Setting up test database', function(done) {
        knex.migrate.latest()
            .then(function() {
                return knex.seed.run();
            })
            .then(function() {
                done();
            });
    });

    describe('GET /api/public/clients', function() {
        it('respond with json', function(done) {
            request(server)
                .get('/api//public/clients')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json')
                .expect(function(res) {
                    should(res.body.clients.length).be.exactly(8);

                    for (let i in res.body.clients) {
                        let client = res.body.clients[i];

                        client.should.have.property('id').which.is.a.Number();
                        client.should.have.property('site').which.is.a.String();
                        client.should.have.property('location').which.is.a.String();

                        let date;

                        client.should.have.property('last_registered').which.is.a.String();
                        date = new Date(client.last_registered);
                        (date).should.eql(new Date('9999-01-01 00:00:00'));

                        client.should.have.property('created_at').which.is.a.String();
                        date = new Date(client.created_at);
                        (date).should.eql(new Date(date.valueOf())); //FIXME: Does this actually verify the string is a valid date?

                        client.should.have.property('updated_at').which.is.a.String();
                        date = new Date(client.updated_at);
                        (date).should.eql(new Date(date.valueOf())); //FIXME: Does this actually verify the string is a valid date?
                    }
                })
                .expect(200, done);
        });
    });

});
