var config = require('../knexfile');
var env    = process.env.DATABASE || 'development';
var knex   = require('knex')(config[env]);

module.exports = knex;

// Better to do this manually
// knex.migrate.latest([config]);
