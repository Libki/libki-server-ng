'use strict';

var Bookshelf = require('../bookshelf');

var Client = Bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: 'clients',
});

module.exports = Client;
