const express = require('express')
const cors = require('cors')
const app = express()
const apiPort = 3000
require('dotenv').config();

// Mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb_uri, { useNewUrlParser: true });
const db = mongoose.connection;

// Checking for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB.");
});
db.on('error', function(){
    console.log(err);
});

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// exporting Routes 
const users = require('./routes/router');
app.use('/api', users);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))