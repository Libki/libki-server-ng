'use strict';

let CryptoJS = require("crypto-js");

let Bookshelf = require('../bookshelf');

let User = Bookshelf.Model.extend(
	{
		tableName: 'users',

		verifyPassword: function(password)  {
			let md5 = CryptoJS.MD5(password).toString();
			return md5 === this.attributes.password;
		},

	}
);

module.exports = User;
