exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('clients').insert(
            {
                id: 1,
                site: 'TestSiteA',
                name: 'TestClient1',
                location: 'TestLocationX',
            }
        ),
        knex('clients').insert(
            {
                id: 2,
                site: 'TestSiteA',
                name: 'TestClient2',
                location: 'TestLocationX',
            }
        ),
        knex('clients').insert(
            {
                id: 3,
                site: 'TestSiteA',
                name: 'TestClient3',
                location: 'TestLocationY',
            }
        ),
        knex('clients').insert(
            {
                id: 4,
                site: 'TestSiteA',
                name: 'TestClient4',
                location: 'TestLocationY',
            }
        ),
        knex('clients').insert(
            {
                id: 5,
                site: 'TestSiteB',
                name: 'TestClient5',
                location: 'TestLocationX',
            }
        ),
        knex('clients').insert(
            {
                id: 6,
                site: 'TestSiteB',
                name: 'TestClient6',
                location: 'TestLocationX',
            }
        ),
        knex('clients').insert(
            {
                id: 7,
                site: 'TestSiteB',
                name: 'TestClient7',
                location: 'TestLocationY',
            }
        ),
        knex('clients').insert(
            {
                id: 8,
                site: 'TestSiteB',
                name: 'TestClient8',
                location: 'TestLocationY',
            }
        ),
      ]);
    });
};
