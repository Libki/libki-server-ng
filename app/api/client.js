'use strict';

let CryptoJS = require("crypto-js");

let Client = require('../models/client');
let Setting = require('../models/setting');
let Reservation = require('../models/reservation');

let CLIENT_SETTINGS = [
    "ClientBehavior",
    "ReservationShowUsername",
    "BannerTopURL",
    "BannerTopWidth",
    "BannerTopHeight",
    "BannerBottomURL",
    "BannerBottomWidth",
    "BannerBottomHeight",
];

module.exports = {
    register: (req, res) => {

        let client = req.body;

        if (!client.site) {
            res.status(400).send('Parameter "site" not sent!');
            return;
        }

        if (!client.name) {
            res.status(400).send('Parameter "name" not sent!');
            return;
        }

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

    settings: (req, res) => {
        let site = req.body.site;

        // 'site' is required
        if (typeof site === 'undefined') {
            res.status(400).send("No param 'site' passed in!");
            return;
        }

        new Setting()
            .query('where', 'site', '=', site)
            .query('where', 'name', 'in', CLIENT_SETTINGS)
            .fetchAll()
            .then(settings => {
                // First convert to a list of name/value pairs
                let settings_by_name = {};
                settings.forEach(s => {
                    settings_by_name[s.attributes.name] = s.attributes.value;
                });

                // This ensures all the settings are sent, even if they don't exist
                // in the database. Settings that don't exist have an empty ("") value.
                CLIENT_SETTINGS.forEach(s => {
                    if (!settings_by_name[s]) {
                        settings_by_name[s] = "";
                    }
                });

                res.json(settings_by_name);
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
