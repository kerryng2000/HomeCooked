const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static('uploads'));

//Able to read variables from .env file
require('dotenv').config();


//Fixes cors errors
app.use(cors());

//Connect to database
const db_string = process.env.DB_STRING;
mongoose.connect(db_string, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
    () => { console.log("Database connection successful") },
    err => { console.log("Database connection failed " + err)}
)

//Parse json and form input
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

require('./models/User');
require('./models/Dish');
require('./models/Cart');
require('./models/Order');
require('./models/Review');
require('./models/Message');



require('./config/passport')(passport);
app.use(passport.initialize());

app.use('/users', require('./routes/users'));
app.use('/Dishes', require('./routes/Dishes'));
app.use('/cart', require('./routes/cart'))
app.use('/orders', require('./routes/orders'))
app.use('/reviews', require('./routes/reviews'))
app.use('/mailbox', require('./routes/mailbox'))
app.use('/message', require('./routes/message'))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});