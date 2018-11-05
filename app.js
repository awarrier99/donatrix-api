const express = require('express');
const path = require('path');
const dao = require('./dao');
require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', dao.registerUser);
app.post('/login', dao.login);

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = app;