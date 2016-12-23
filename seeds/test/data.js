exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return setupClients(knex)
            .then( setupUsers(knex) );
};

function setupClients(knex) {
    return knex('clients').del()
        .then(createClients(knex));
}

function createClients(knex) {
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

function setupUsers(knex) {
    return knex('users').del()
        .then(createUsers(knex));
}

function createUsers(knex) {
    return Promise.all([
        // Inserts seed entries
        knex('users').insert({
            id: 1,
            site: 'TestSiteA',
            username: 'TestUser1',
            password: 'i5f4dcc3b5aa765d61d8327deb882cf99', // Literally 'password' hashed to md5 base 64
            minutes_allotment: 999,
            minutes: 60,
            status: "Logged out",
            notes: "Test note",
            is_troublemaker: false,
            is_guest: false,
            birthdate: "1981-06-10",
            created_at: '9999-01-01 00:00:00',
            updated_at: '9999-01-01 00:00:00',
        }),
    ]);
}
