'use strict';

let Client = require('../models/client');
let Setting = require('../models/setting');
let Reservation = require('../models/reservation');

module.exports = {
    register: (request, response) => {
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

    settings: (request, response) => {
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

    acknowledge_reservation: (request, response) => {
        //TODO: this function should set the expiration for a reservation
        //when this function has been called, it means the client is now
        //reserved and waiting for the reserver to log in
        console.log("Client API function acknowledge_reservation not yet implemented!");
    },

    user: (request, response) => {
        //TODO: return the logged in user data for this user
        //including messages, minutes, and status
    },

    login: (request, response) => {
        //TODO: on login, verify username and password, create statistic line
    },

    logout: (request, response) => {
        //TODO: on logout create statistic line and delete session
    },
}
