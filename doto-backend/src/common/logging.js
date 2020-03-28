const {createLogger, transports, format} = require('winston');

const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(
            info => `${info.timestamp} [${info.level}] ${JSON.stringify(info.message)}`
        )
    ),
})

module.exports.logger = logger;