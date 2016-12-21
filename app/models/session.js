'use strict';

let Bookshelf = require('../bookshelf');

let Session = Bookshelf.Model.extend({
  tableName: 'sessions',
});

module.exports = Session;
