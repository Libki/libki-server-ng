'use strict';

let Client = require('../models/client');

module.exports = {
    clients: function(request, response) {
        new Client().fetchAll()
            .then(clients => {
                response.json({
                    clients: clients
                });
            }).catch(error => {
                console.log(error);
                response.send('An error occured');
            });
    },


}
