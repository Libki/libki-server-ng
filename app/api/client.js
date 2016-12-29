'use strict';

let CryptoJS = require("crypto-js");

let Client = require('../models/client');
let Setting = require('../models/setting');
let Reservation = require('../models/reservation');
let Session = require('../models/session');
let User = require('../models/user');
let Statistic = require('../models/statistic');

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
                console.log("ERROR: " + err);
                res.status(500).send(err);
            });
    },

    settings: (req, res) => {
        let site = req.body.site;

        if (!site) {
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
                return;
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

    login: async (req, res) => {
        //TODO: on login, verify username and password, create statistic line
        let data = req.body;

        let site = data.site;
        let username = data.username;
        let password = data.password;
        let client_name = data.client_name;

        // Basic parameter checking
        if (!site) {
            res.status(400).send('Parameter "site" not sent!');
            return;
        }

        if (!username) {
            res.status(400).send('Parameter "username" not sent!');
            return;
        }

        if (!password) {
            res.status(400).send('Parameter "password" not sent!');
            return;
        }

        if (!client_name) {
            res.status(400).send('Parameter "client_name" not sent!');
            return;
        }

        // Get client
        let client = null;
        try {
            client = await Client
                .where('name', client_name)
                .where('site', site)
                .fetch({
                    require: true
                });
        } catch (err) {
            res.status(401).send('Parameter "client_name" invalid!');
            return;
        }

        // Get user
        let user = null;
        try {
            user = await User.where('username', username)
                .where('site', site)
                .fetch({
                    require: true
                });
        } catch (err) {
            res.status(401).send('Parameter "username" invalid!');
            return;
        }

        // Validate password
        let md5 = CryptoJS.MD5(password).toString();
        if (md5 != user.attributes.password) {
            res.status(401).send('Parameter "password" invalid!');
            return;
        }

        // Get existing session
        let session = null;
        try {
            session = await Session.where('username', username)
                .where('site', site)
                .fetch();
        } catch (err) {
            console.log("ERROR: " + err);
            res.status(500).send(err);
            return;
        }

        if (session) { // User already has session, reject login
            res.status(409).send('User already has active session!');
            return;
        }

        // User doesn't have a session, create it!
        try {
            session = await Session.forge({
                client_id: client.attributes.id,
                user_id: user.attributes.id,
            }).save();
        } catch (err) {
            console.log("ERROR: " + err);
            res.status(500).send(err);
            return;
        }

        // Create a statistics line for the login
        let statistic = null;
        try {
            statistic = await Statistic.forge({
                site: site,
                username: username,
                client_name: client_name,
                client_location: client.attributes.location,
                action: "LOGIN",
            }).save();
        } catch (err) {
            console.log("ERROR: " + err);
            res.status(500).send(err);
            return;
        }

        // Return some data to the client
        res.json({
            username: user.attributes.username,
            minutes: user.attributes.minutes,
            status: user.attributes.status,
            notes: user.attributes.notes,
        });
    },

    logout: (req, res) => {
        //TODO: on logout create statistic line and delete session
    },
}
