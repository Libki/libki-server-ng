'use strict';

let Bookshelf = require('../bookshelf');

let Setting = Bookshelf.Model.extend({
  tableName: 'settings',
});

module.exports = Setting;
