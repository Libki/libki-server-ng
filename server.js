'use strict';

let express = require('express'); // call express
let bodyParser = require('body-parser'); // will let us pull POST content from our HTTP request

let publicAPI = require('./app/api/public');
let publicReservationAPI = require('./app/api/public/reservation');
let clientAPI = require('./app/api/client');

let app = express(); // define our app using express

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// For parsing application/json
app.use(bodyParser.json());

let port = process.env.PORT || 9090; // set our port

let router = express.Router(); // get an instance of the express Router

// Set up our routes
router.get('/public/clients', publicAPI.clients);

router.post('/public/reservation', publicReservationAPI.create);
router.delete('/public/reservation/:id', publicReservationAPI.delete);

router.get('/client/settings', clientAPI.settings);

router.get('/client/register', clientAPI.register);
router.post('/client/register', clientAPI.register);

router.post('/client/login', clientAPI.login);
router.post('/client/logout', clientAPI.logout);
router.post('/client/acknowledge_reservation', clientAPI.acknowledge_reservation);


// all of our routes will be prefixed with /api
app.use('/api', router);

let server = app.listen(port, () => {
    console.log(`Libki server is listening on port ${server.address().port}`);
});

module.exports = server;