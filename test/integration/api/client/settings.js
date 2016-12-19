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
            name: "ClientBehavior",
            value: "Value",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteA",
            name: "ReservationShowUsername",
            value: "Value",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteA",
            name: "NonWhiteListedSetting",
            value: "Value",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteB",
            name: "ClientBehavior",
            value: "Value",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteB",
            name: "ReservationShowUsername",
            value: "Value",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }, {
            site: "TestSiteB",
            name: "NonWhiteListedSetting",
            value: "Value",
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
                        let settings = res.body;

                        should( Object.keys(settings).length ).be.exactly(8);

                        settings.should.have.property('ClientBehavior').which.is.a.String();
                        settings.should.have.property('ReservationShowUsername').which.is.a.String();
                        settings.should.have.property('BannerTopURL').which.is.a.String();
                        settings.should.have.property('BannerTopWidth').which.is.a.String();
                        settings.should.have.property('BannerTopHeight').which.is.a.String();
                        settings.should.have.property('BannerBottomURL').which.is.a.String();
                        settings.should.have.property('BannerBottomWidth').which.is.a.String();
                        settings.should.have.property('BannerBottomHeight').which.is.a.String();

                        settings.should.not.have.property('NonWhiteListedSetting');
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
