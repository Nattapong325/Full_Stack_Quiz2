var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var users = require('./users.js');

app.use(express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

function hello(req, res, next) {
    res.write("Hello \n");
    next();
}

function now(req, res, next) {
    var now = new Date();
    res.write('Now: ' + now + "\n");
    next();
}

function goodbye(req, res, next) {
    res.write('Goodbye \n');
    res.end();
}

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(logger);

app.get('/hello', hello, now, goodbye);

app.get('/', function (request, response) {
    response.send('l lnw beer !!!!!');
});

app.get('/now', function (request, response) {
    var now = new Date();
    response.send('<strong>Now:</strong> ' + now);
});

app.get('/json', function (request, response) {
    var user = {
        id: 111,
        name: "User111"
    };
    response.send(user);
});

// app.get('/api/users', function (req, res) {
//     var user_id = req.query.id;
//     var token = req.query.token;
//     var it = req.query.it;
//     res.send(user_id + ' ' + token + ' ' + it);
// });

// app.get('/api/users/:id/:name', function (req, res) {
//     var user_id = req.params.id;
//     var user_name = req.params.name;
//     res.send(user_id + ' ' + user_name);
// });

app.post('/api/users', function (req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
    res.send(user_id + ' ' + token + ' ' + geo);
});



app.get('/users', users.findAll);
app.get('/users/search', users.findById);
app.get('/users/role/:role', users.findByRole);
app.get('/users/expired/:expired', users.expired);

app.listen(3000, () => console.log('Server is running at http://localhost:3000'));