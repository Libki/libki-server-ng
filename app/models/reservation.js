'use strict';

let Bookshelf = require('../bookshelf');

let Reservation = Bookshelf.Model.extend({
  tableName: 'reservations',
});

module.exports = Reservation;
