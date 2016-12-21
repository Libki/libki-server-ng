exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('clients').del()
        .then(setupUsers(knex));
};

function setupUsers(knex) {
    return Promise.all([
        // Inserts seed entries
        knex('clients').insert({
            id: 1,
            site: 'TestSiteA',
            name: 'TestClient1',
            location: 'TestLocationX',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
        knex('clients').insert({
            id: 2,
            site: 'TestSiteA',
            name: 'TestClient2',
            location: 'TestLocationX',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
        knex('clients').insert({
            id: 3,
            site: 'TestSiteA',
            name: 'TestClient3',
            location: 'TestLocationY',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
        knex('clients').insert({
            id: 4,
            site: 'TestSiteA',
            name: 'TestClient4',
            location: 'TestLocationY',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
        knex('clients').insert({
            id: 5,
            site: 'TestSiteB',
            name: 'TestClient5',
            location: 'TestLocationX',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
        knex('clients').insert({
            id: 6,
            site: 'TestSiteB',
            name: 'TestClient6',
            location: 'TestLocationX',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
        knex('clients').insert({
            id: 7,
            site: 'TestSiteB',
            name: 'TestClient7',
            location: 'TestLocationY',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
        knex('clients').insert({
            id: 8,
            site: 'TestSiteB',
            name: 'TestClient8',
            location: 'TestLocationY',
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
    ]);
}
