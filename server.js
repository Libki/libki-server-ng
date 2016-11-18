'use strict';

let express = require('express'); // call express
let bodyParser = require('body-parser'); // will let us pull POST content from our HTTP request

let Client = require('./app/models/client');

let app = express(); // define our app using express

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// For parsing application/json
app.use(bodyParser.json());

let port = process.env.PORT || 8080; // set our port

let router = express.Router(); // get an instance of the express Router

router.get('/public/clients', function(request, response) {
    new Client().fetchAll()
        .then(clients => {
            response.json({
                clients: clients
            });
        }).catch(error => {
            console.log(error);
            response.send('An error occured');
        });
});

router.post('/client/register', function(request, response) {
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
});

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Libki server is listening on port ' + port);
