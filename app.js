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
app.post('/checkUser', dao.checkUser);
app.post('/addItem', dao.addItem);
app.patch('/updateItem', dao.updateItem);
app.get('/allItems', dao.getAllItems);
app.get('/locations', dao.getLocations);
app.post('/location', dao.getLocationById);
app.post('/location/getItems', dao.getItemsByLocation);
app.post('/category/getItems', dao.getItemsByCategory);
app.post('/name/getItems', dao.getItemsByName);
app.post('/filtered/getItems', dao.getItemsByMultiple);

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = app;
