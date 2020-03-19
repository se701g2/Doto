const express = require('express')
const cors = require('cors')
const passportSetUp = require('./src/config/passport-setup.js')
const app = express()
const apiPort = process.env.PORT || 3001
require('dotenv').config();
const passport = require('passport')

// Mongoose connection
const mongoose = require('mongoose');
// db connection string will point to Azure string only in production, fallbacks to dev database string 
const connectionString = process.env.AZURE_CONN || process.env.mongodb_uri;
// Add authentication strings only in production environment
const connParams = { useNewUrlParser: true }
if(process.env.AZURE_USER && process.env.AZURE_PW){
    connParams.auth = {
        user : process.env.AZURE_USER,
        password: process.env.AZURE_PW
    };
}
mongoose.connect(connectionString, connParams);
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
app.use(passport.initialize());

// exporting Routes 
const task = require('./src/routes/task-route');
app.use('/task', task);
const user = require('./src/routes/user-route');
app.use('/user', user);
const authRoute = require('./src/routes/auth-route')
app.use('/auth', authRoute)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))