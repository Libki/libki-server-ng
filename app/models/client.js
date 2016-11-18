'use strict';

var Bookshelf = require('../bookshelf');

var Client = Bookshelf.Model.extend({
  tableName: 'clients',
});

module.exports = Client;
