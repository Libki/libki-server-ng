var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // will let us pull POST content from our HTTP request
var knex = require('./knex');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var router = express.Router(); // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Libki server is listening on port ' + port);
