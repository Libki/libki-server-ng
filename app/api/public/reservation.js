'use strict';

let User = require('../../models/user');
let Client = require('../../models/client');
let Reservation = require('../../models/reservation');
let Statistic = require('../../models/statistic');

module.exports = {
    create: async(req, res, next) => {
        let site = req.body.site;
        let username = req.body.username;
        let password = req.body.password;
        let client_id = req.body.client_id;

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

        if (!client_id) {
            res.status(400).send('Parameter "client_id" not sent!');
            return;
        }

        // Get client
        let client;
        try {
            client = await Client
                .where('id', client_id)
                .where('site', site)
                .fetch({
                    require: true
                });
        } catch (err) {
            res.status(401).send('Parameter "client_id" invalid!');
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
            res.status(401).send('Parameter "username" or "password" invalid!');
            return;
        }

        // Validate password
        if (!user.verifyPassword(password)) {
            res.status(401).send('Parameter "username" or "password" invalid!');
            return;
        }

        // Get reservation
        let reservation = null;

        // Has user already reserved this client?
        try {
            reservation = await new Reservation({
                client_id: client_id,
                user_id: user.get('id'),
            }).fetch();
        } catch (err) {
            res.status(500).send('ERROR: ' + err);
            return;
        }

        if (reservation) {
            res.status(409).json({
                success: false,
                reason: 'CLIENT_USER_ALREADY_RESERVED',
            });
            return;
        }

        // Does this client already have a reservation by a different user?
        try {
            reservation = await Reservation
                .where('client_id', client_id)
                .where('site', site)
                .fetch();
        } catch (err) {
            res.status(500).send('ERROR: ' + err);
            return;
        }

        if (reservation) {
            res.status(409).json({
                success: false,
                reason: 'CLIENT_ALREADY_RESERVED',
            });
        }

        // Has user already reserved a different client
        try {
            reservation = await Reservation
                .where('user_id', user.attributes.id)
                .where('site', site)
                .fetch();
        } catch (err) {
            res.status(500).send('ERROR: ' + err);
            return;
        }

        if (reservation) {
            res.status(409).json({
                success: false,
                reason: 'USER_ALREADY_RESERVED',
            });
        }

        //TODO: Replicate can_user_use

        // User is clear to place a reservation on this client!
        reservation = null;
        try {
            reservation = await Reservation.forge({
                client_id: client_id,
                user_id: user.attributes.id,
            }).save();
        } catch (err) {
            res.status(500).send(err);
            return;
        }

        let r = await Reservation
            .where('user_id', 1)
            .where('site', 1)
            .fetch();

        res.json(reservation);
        return;
    },

    delete: (req, res, next, id) => {

    },
}
