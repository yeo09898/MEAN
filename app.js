const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connect to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error' + err);
});

const app = express();

const users = require('./routes/users');

//port number
const port = 3000;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body-paser Middleware
app.use(bodyPaser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

//index route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//start server
app.listen(port, () => {
    console.log('Running on Port 3000 ...');
});