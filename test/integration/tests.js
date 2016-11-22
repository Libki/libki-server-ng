'use strict';

process.env['DATABASE'] = 'test';

let request = require('supertest');

let knex = require('../../app/knex');
let server = require('../../server');

describe('loading express', function() {

    beforeEach('Setting up test database', function(done) {
        console.log("*********** Installing Schema **************");
        knex.migrate.latest()
            .then(function() {
                console.log("*********** Schema Installed **************");
                return knex.seed.run();
            })
            .then(function() {
                console.log("*********** Seed Data Installed **************");
                done();
            });
    });

    afterEach(function() {});

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(404, done);
    });

    describe('GET /api/public/clients', function() {
        it('respond with json', function(done) {
            request(server)
                .get('/api//public/clients')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json')
                .expect(function(res) {
                    console.log(res.body);
                })
                .expect(200, done);
        });
    });

    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});
