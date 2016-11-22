module.exports = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: ':memory:'
            //filename: './test.sqlite3'
        },
        useNullAsDefault: true,
        seeds: {
            directory: './seeds/test'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
        //debug: true,
    },

    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        useNullAsDefault: true,
        seeds: {
            directory: './seeds/development'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
        //debug: true,
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
