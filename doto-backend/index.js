const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3000

// Mongoose connection
const mongoose = require('mongoose');
const connectionString = "mongodb+srv://701Group2:SoftwareEngineering701Group2@cluster0-ahuai.mongodb.net";
mongoose.connect(connectionString, { useNewUrlParser: true });
const db = mongoose.connection;

// Checking for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB.");
});
db.on('error', function(){
    console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// exporting Routes 
const users = require('./routes/router');
app.use('/api', users);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))