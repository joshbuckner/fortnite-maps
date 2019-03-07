require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');

const app = express();

app.set('view engine', 'ejs');

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/maps', express.static('public'));
app.use('/admin', express.static('public'));
app.use('/admin/editlive', express.static('public'));
app.use('/admin/editsubmission', express.static('public'));

mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0-v7wao.mongodb.net/fortniteMapsDB', {useNewUrlParser: true});

// initialize passport
const initPassport = require('./passport/init');
initPassport(passport);

const routes = require('./routes/index')(passport);
app.use('/', routes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, '0.0.0.0', function() {
    console.log('Server has started successfully.');
});