'use strict';

process.env['DATABASE'] = 'test';

let request = require('supertest');
let should = require('should');

let knex = require('../../../../app/knex');
let bookshelf = require('../../../../app/bookshelf');
let server = require('../../../../server');

let Setting = require('../../../../app/models/setting.js');
let Settings = bookshelf.Collection.extend({
    model: Setting
});

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

    describe('GET /api/client/settings', function() {
        let settings = Settings.forge([{
            site: "TestSiteA",
            name: "Setting1",
            value: "Value1",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteA",
            name: "Setting2",
            value: "Value2",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteB",
            name: "Setting1",
            value: "Value1",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteB",
            name: "Setting2",
            value: "Value2",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, ]);

        it('respond with json for settings', function(done) {
            settings.invokeThen('save').then(function() {
                request(server)
                    .get('/api/client/settings')
                    .send({
                        'site': 'TestSiteA',
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json')
                    .expect(function(res) {
                        let settings = res.body.settings;

                        // We should only get the TestSiteA params
                        should(settings.length).be.exactly(2);

                        // Check first setting
                        let setting = settings[0];
                        setting.should.have.property('site').which.is.a.String();
                        setting.should.have.property('name').which.is.a.String();
                        setting.should.have.property('value').which.is.a.String();

                        let date;

                        setting.should.have.property('created_at').which.is.a.String();
                        date = new Date(setting.created_at);
                        (date).should.eql(new Date(date.valueOf()));

                        setting.should.have.property('updated_at').which.is.a.String();
                        date = new Date(setting.updated_at);
                        (date).should.eql(new Date(date.valueOf()));

                        // Check second setting
                        setting = settings[1];
                        setting.should.have.property('site').which.is.a.String();
                        setting.should.have.property('name').which.is.a.String();
                        setting.should.have.property('value').which.is.a.String();

                        setting.should.have.property('created_at').which.is.a.String();
                        date = new Date(setting.created_at);
                        (date).should.eql(new Date(date.valueOf()));

                        setting.should.have.property('updated_at').which.is.a.String();
                        date = new Date(setting.updated_at);
                        (date).should.eql(new Date(date.valueOf()));
                    })
                    .expect(200, done);
            });
        });
    });

    describe('GET /api/client/settings requires param "site"', function() {
        it('responds with 400 if "site" is not passed in', function(done) {
            request(server)
                .get('/api/client/settings')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .expect(400, done);
        });
    });

});
