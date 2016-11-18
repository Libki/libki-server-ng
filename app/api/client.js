'use strict';

let Client = require('../models/client');
let Setting = require('../models/setting');

module.exports = {
    register: function(request, response) {
        //FIXME: Need to do some error checking here
        new Client(request.body)
            .save()
            .then(client => {
                response.json(
                    client.toJSON()
                )
            })
            .catch(error => {
                console.log(error);
                response.send('An error occured');
            });
    },

    settings: function(request, response) {
        new Setting().fetchAll()
            .then(settings => {
                response.json({
                    settings: settings
                });
            }).catch(error => {
                console.log(error);
                response.send('An error occured');
            });
    }
}
