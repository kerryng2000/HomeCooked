const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

require('dotenv').config();
app.use(cors());

const db_string = process.env.DB_STRING;
mongoose.connect(db_string, { useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => { console.log("Database connection successful") },
    err => { console.log("Database connection failed " + err)}
)

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});