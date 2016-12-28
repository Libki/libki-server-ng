'use strict';

let Bookshelf = require('../bookshelf');

let Statistic = Bookshelf.Model.extend({
  tableName: 'statistics',
});

module.exports = Statistic;
