'use strict';

let Client = require('../models/client');

module.exports = {
    clients: (req, res) => {
        new Client().fetchAll()
            .then(clients => {
                res.json({
                        clients: clients
                    });
            }).catch(error => {
                console.log(error);
                res.send('An error occured');
            });
    },
}
