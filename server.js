var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var utils = require('./lib/utils');
var request = require('request');
var google = require('google');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/analise', function (req, res, next) {
    var input = fs.readFileSync(path.join(__dirname + '/files/input.txt')).toString().split('\n');
    var patterns = fs.readFileSync(path.join(__dirname + '/files/patterns.txt')).toString().split('\n');

    var mod1 = [];
    var mod2 = [];
    var mod3 = [];
    for (var i in input) {
        for (var p in patterns) {
            if (input[i].match(new RegExp("^" + patterns[p] + "$"))) {
                mod1.push(input[i])
            }
            if (input[i].match(new RegExp(patterns[p]))) {
                mod2.push(input[i])
            }
            if(utils.levenshtein(input[i], patterns[p]) <= 1){
                mod3.push(input[i]);
            }
        }
    }
    res.send({'mod1': mod1, 'mod2': mod2, 'mod3': mod3});
});

app.get('/getfiles', function (req, res, next) {
    var input = fs.readFileSync(path.join(__dirname + '/files/input.txt')).toString();
    var patterns = fs.readFileSync(path.join(__dirname + '/files/patterns.txt')).toString();
    res.send({'input': input, 'patterns': patterns});
});

app.post('/googleget', function (req, res, next) {
    google.resultsPerPage = 1;
    google(req.body.search_text, function (err, response){
        if (err) console.error(err);
        res.send(response.links);
    });
});

app.listen(3000, function () {
    console.log('Server is running...')
});