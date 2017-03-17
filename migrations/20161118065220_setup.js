exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').unsigned().primary();
            table.string('site').notNull().defaultTo("");
            table.string('username').notNull();
            table.string('password').notNull();
            table.integer('minutes_allotment').notNull();
            table.integer('minutes').notNull();
            table.string('status').notNull();
            table.text('notes').nullable();
            table.boolean('is_troublemaker').notNull().defaultTo(false);
            table.boolean('is_guest').notNull().defaultTo(false);
            table.date('birthdate').nullable();

            table.timestamps();

            table.unique(['site', 'username']);
        }),

        knex.schema.createTable('clients', function(table) {
            table.increments('id').unsigned().primary();
            table.string('site').notNull().defaultTo("");
            table.string('name').notNull();
            table.string('location').nullable();

            table.timestamps();

            table.unique(['site', 'name', 'location']);
        }),

        knex.schema.createTable('sessions', function(table) {
            table.integer('client_id').unsigned().notNull();
            table.integer('user_id').unsigned().notNull();

            table.timestamps();

            table.unique(['client_id']);
            table.unique(['user_id']);

            table.foreign('client_id').references('clients.id');
            table.foreign('user_id').references('users.id');
        }),

        knex.schema.createTable('reservations', function(table) {
            table.increments('id').unsigned().primary();
            table.integer('client_id').unsigned().notNull();
            table.integer('user_id').unsigned().notNull();
            table.dateTime('expiration').nullable();

            table.timestamps();

            table.unique(['client_id']);
            table.unique(['user_id']);

            table.foreign('client_id').references('clients.id');
            table.foreign('user_id').references('users.id');
        }),

        knex.schema.createTable('statistics', function(table) {
            table.increments('id').unsigned().primary();
            table.string('site').notNull().defaultTo("");
            table.string('username').notNull();
            table.string('client_name').notNull();
            table.string('client_location').nullable();
            table.string('action').notNull();

            table.timestamps();
        }),

        knex.schema.createTable('messages', function(table) {
            table.increments('id').unsigned().primary();
            table.integer('user_id').unsigned().notNull();
            table.string('content').notNull();

            table.timestamps();

            table.foreign('user_id').references('users.id');
        }),

        knex.schema.createTable('locations', function(table) {
            table.increments('id').unsigned().primary();
            table.string('site').notNull().defaultTo("");
            table.string('code').notNull();

            table.timestamps();
        }),

        knex.schema.createTable('closing_hours', function(table) {
            table.increments('id').unsigned().primary();
            table.integer('location_id').unsigned().notNull();
            table.enu('day',['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']).nullable();
            table.date('date').nullable();
            table.time('closing_time').notNull();

            table.timestamps();

            table.foreign('location_id').references('locations.id');
        }),

        knex.schema.createTable('client_age_limits', function(table) {
            table.increments('id').unsigned().primary();
            table.integer('client_id').unsigned().notNull();
            table.enu('comparison', ['eq', 'ne', 'gt', 'lt', 'le', 'ge']).notNull();
            table.integer('age').unsigned().notNull();

            table.timestamps();

            table.unique(['client_id']);

            table.foreign('client_id').references('clients.id');
        }),

        knex.schema.createTable('settings', function(table) {
            table.string('site').notNull().defaultTo("");
            table.string('name').notNull();
            table.string('value').notNull();

            table.timestamps();

            table.unique(['site','name']);
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('clients')
    ]);
};
