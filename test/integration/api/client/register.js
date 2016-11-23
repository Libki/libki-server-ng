'use strict';

process.env['DATABASE'] = 'test';

let request = require('supertest');
let should = require('should');

let knex = require('../../../../app/knex');
let server = require('../../../../server');

describe('loading express', function() {

    before('setting up test database schema', done => {
        knex.migrate.latest().then( () => {
            done();
        });
    });

    beforeEach('setting up test database data', function(done) {
        knex.seed.run().then( () => {
            done();     
        });
    });

    describe('POST /api/client/register', function() {
        it('respond with json', function(done) {
            request(server)
                .post('/api/client/register')
                .send(
                    {
                        'site': 'TestSite',
                        'name': 'TestName',
                        'location': 'TestLocation',
                    }
                )
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json')
                .expect(function(res) {
                    let client = res.body;

                    client.should.have.property('id').which.is.a.Number();
                    client.should.have.property('site').which.is.a.String();
                    client.should.have.property('location').which.is.a.String();

                    let date;

                    client.should.have.property('created_at').which.is.a.String();
                    date = new Date(client.created_at);
                    (date).should.eql(new Date(date.valueOf())); //FIXME: Does this actually verify the string is a valid date?

                    client.should.have.property('updated_at').which.is.a.String();
                    date = new Date(client.updated_at);
                    (date).should.eql(new Date(date.valueOf())); //FIXME: Does this actually verify the string is a valid date?
                })
                .expect(200, done);
        });
    });

});
