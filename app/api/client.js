'use strict';

let Client = require('../models/client');
let Setting = require('../models/setting');
let Reservation = require('../models/reservation');

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
    },

    acknowledge_reservation: function( request, response ) {
        //TODO: this function should set the expiration for a reservation
        //when this function has been called, it means the client is now
        //reserved and waiting for the reserver to log in
        console.log("Client API function acknowledge_reservation not yet implemented!");
    }
}
