"use strict";
let winston = require('arrowjs').winston;

module.exports = {
    winstonLog : {
        transports: [
            new winston.transports.Console({
                prettyPrint: true,
                colorize: true,
                silent: false,
                timestamp: false
            }),
            new winston.transports.File({
                level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
                filename:  'logs.log',
                maxsize: 1024 * 1024 * 10, // 10MB
                name : "default-log"
            }),
            new winston.transports.File({
                level : "error",
                filename: 'error.log',
                maxsize: 1024 * 1024 * 10, // 10MB
                name : "error-log"
            })
        ],
        exceptionHandlers: [
            new winston.transports.File({
                filename: 'exceptions.log'
            }),
            new winston.transports.Console({
                prettyPrint: true,
                colorize: true,
                silent: false,
                timestamp: false
            })
        ]
    },
    handlerError : function (err, req, res, next) {
        console.error(err);
        res.render('_500');
    },
    handler404: function (req, res) {
        res.render('_404');
    }
};