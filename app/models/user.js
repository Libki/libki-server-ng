'use strict';

let Bookshelf = require('../bookshelf');

let User = Bookshelf.Model.extend({
  tableName: 'users',
});

module.exports = User;
