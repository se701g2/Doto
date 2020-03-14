const express = require('express')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT || 3000
require('dotenv').config();
const connectionString = process.env.AZURE_CONN || process.env.mongodb_uri;
// Mongoose connection
const mongoose = require('mongoose');
const connObj = { useNewUrlParser: true }
if(process.env.AZURE_USER && process.env.AZURE_PW){
    connObj.auth = {
        user : process.env.AZURE_USER,
        password: process.env.AZURE_PW
    };
}
mongoose.connect(connectionString, connObj);
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
const users = require('./src/routes/router');
app.use('/api', users);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))