'use strict';

let Client = require('../models/client');
let Setting = require('../models/setting');
let Reservation = require('../models/reservation');

module.exports = {
    register: (req, res) => {
        //FIXME: Need to do some error checking here

        let client = req.body;
        new Client(client)
            .save()
            .then(client => {
                res.json(client)
            })
            .catch(error => {
                console.log(error);
                res.send('An error occured');
            });
    },

    //FIXME: Will need to whitelist public settings
    settings: (req, res) => {
        let site = req.body.site;

        // 'site' is required
        if ( typeof site === 'undefined' ) {
            res.status(400).send("No param 'site' passed in!");
            return;
        }

        new Setting()
            .query('where', 'site', '=', site )
            .fetchAll()
            .then(settings => {
                res.json({
                    settings: settings
                });
            }).catch(error => {
                console.log(error);
                res.status(400).send('An error occured');
            });
    },

    acknowledge_reservation: (req, res) => {
        //TODO: this function should set the expiration for a reservation
        //when this function has been called, it means the client is now
        //reserved and waiting for the reserver to log in
        console.log("Client API function acknowledge_reservation not yet implemented!");
    },

    user: (req, res) => {
        //TODO: return the logged in user data for this user
        //including messages, minutes, and status
    },

    login: (req, res) => {
        //TODO: on login, verify username and password, create statistic line
    },

    logout: (req, res) => {
        //TODO: on logout create statistic line and delete session
    },
}
