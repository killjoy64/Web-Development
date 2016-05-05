"use strict";

class app {
    constructor() {
        app.loadServer();
    }

    static loadServer() {
        const HTTP = require('http'),
            PORT = 1337,
            SERVER = HTTP.createServer(function(req, res) {
                let httpHandler = function(err, str, contentType) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('An error has occurred: ' + err.message);
                    } else if (contentType.indexOf('image') >= 0) {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(str, 'binary');
                    } else {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(str);
                    }
                };

                if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
                    if (req.method == 'POST') {
                        app.getFormData(req, res);
                    } else {
                        console.log("[405] " + req.method + " to " + req.url);
                        res.writeHead(405, "Method not supported", { 'Content-Type': 'text/html' });
                        res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
                    }
                } else if (req.url.indexOf('/javascripts/') >= 0) {
                    app.render(req.url.slice(1), 'application/ecmascript', httpHandler, 'utf-8');
                } else if (req.url.indexOf('/css/') >= 0) {
                    app.render(req.url.slice(1), 'text/css', httpHandler, 'utf-8');
                } else if (req.url.indexOf('/images/') >= 0) {
                    app.render(req.url.slice(1), 'image/jpeg', httpHandler, 'binary');
                } else {
                    app.render('public/views/index.html', 'text/html', httpHandler, 'utf-8');
                }

            }).listen(PORT, function() {
                console.log('-= Meme Server Listening at http://127.0.0.1:' + PORT + ' =-');
            });
    }

    static render(path, contentType, callback, encoding) {
        const FS = require('fs');
        FS.readFile(__dirname + '/' + path, encoding ? encoding : 'utf-8', function(err, str) { // ternary
            callback(err, str, contentType);
        });
    }

    static getFormData(req, res) {
        const FORMIDABLE = require('formidable'),  // https://docs.nodejitsu.com/articles/HTTP/servers/how-to-handle-multipart-form-data
            ATM_USER = require('./node/ATMUser');
        let formData = {};
        new FORMIDABLE.IncomingForm().parse(req)
            .on('field', function(field, name) {
                formData[field] = name;
            })
            .on('error', function(err) {
                next(err);
            })
            .on('end', function() {
                let userData = new ATM_USER(formData);
                let pin = userData.getPIN();
                res.writeHead(200, {'content-type': 'text/plain'});
                if (formData['request'] == null) {
                    console.log("User[" + pin + "] sent a LOGIN request");
                    res.end(userData.getUserName());
                } else {
                    let request = formData['request'];
                    if (request == 'balance') {
                        console.log("User[" + pin + "] sent a BALANCE request");
                        res.end(userData.getBalance());
                    } else if (request == 'withdraw_savings') {
                        console.log("User[" + pin + "] sent a WITHDRAW_SAVINGS request");
                        if (formData['data'] != null) {
                            let amount = parseFloat(formData['data']);
                            res.end(userData.withdrawSavings(amount));
                        }
                    } else if (request == 'withdraw_checking') {
                        console.log("User[" + pin + "] sent a WITHDRAW_CHECKING request");
                        if (formData['data'] != null) {
                            let amount = parseFloat(formData['data']);
                            res.end(userData.withdrawChecking(amount));
                        }
                    } else if (request == 'transfer_from_checking') {
                        if (formData['data'] != null) {
                            let amount = parseFloat(formData['data']);
                            console.log("User[" + pin + "] sent a TRANSFER_FROM_CHECKING request");
                            res.end(userData.transferFromChecking(amount));
                        }
                    } else if (request == 'transfer_from_savings') {
                        if (formData['data'] != null) {
                            let amount = parseFloat(formData['data']);
                            console.log("User[" + pin + "] sent a TRANSFER_FROM_SAVINGS request");
                            res.end(userData.transferFromSavings(amount));
                        }
                    } else if (request == 'deposit_savings') {
                        console.log("User[" + pin + "] sent a WITHDRAW_SAVINGS request");
                        if (formData['data'] != null) {
                            let amount = parseFloat(formData['data']);
                            res.end(userData.depositSavings(amount));
                        }
                    } else if (request == 'deposit_checking') {
                        console.log("User[" + pin + "] sent a WITHDRAW_CHECKING request");
                        if (formData['data'] != null) {
                            let amount = parseFloat(formData['data']);
                            res.end(userData.depositChecking(amount));
                        }
                    }
                }
            });
    }
}

module.exports = app;