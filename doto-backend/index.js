const express = require('express')
const cors = require('cors')
require('dotenv').config();
const passportSetUp = require('./src/config/passport-setup.js')
const app = express()
const apiPort = process.env.PORT || 3001
const passport = require('passport')
const winston = require('winston');
const expressWinston = require('express-winston');
const { logger } = require('./src/common/logging');

// Mongoose connection
const mongoose = require('mongoose');
// db connection string will point to Azure string only in production, fallbacks to dev database string 
const connectionString = process.env.AZURE_CONN || process.env.DEVELOPMENT_DB_CONN;
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
    logger.info("Connected to MongoDB.");
});
db.on('error', function(){
    logger.error("Database error");
});

// logging
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(
        info =>
          `${info.timestamp} [${info.level}] ${info.message} ${info.meta.res.statusCode}`
      )
    ),
  })
);

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

//Swagger UI Setup
var swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use('/',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.listen(apiPort, () => logger.info(`Server running on port ${apiPort}`))