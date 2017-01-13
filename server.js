/**
 * Created by adam on 13.1.2017.
 */

var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/', express.static(__dirname + '/'));

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'adamluptakosice@gmail.com', // Your email id
        pass: 'adamlupt' // Your password
    }
});

app.post('/email', function (req, res) {
    var htmlContent = '<p>Name: ' + req.body.name + '</p>' +
        '<p>Email: ' + req.body.email + '</p>' +
        '<p>Message: ' + req.body.message + '</p>';
    var mailOptions = {
        to: 'adamluptakosice@gmail.com',                  // your email here
        subject: 'New message',
        from: req.body.name + ' <' + req.body.email + '>',
        sender: req.body.email,
        html: htmlContent
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
            return res.json(201, info);
        }
    });
});

app.post('/news', function (req, res) {
    var htmlContent = '<p>Email: ' + req.body.email + '</p>' +
        '<p>Message: newsletter</p>';
    var mailOptions = {
        to: 'adamluptakosice@gmail.com',                  // your email here
        subject: 'New message',
        from: req.body.name + ' <' + req.body.email + '>',
        sender: req.body.email,
        html: htmlContent
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
            return res.json(201, info);
        }
    });
});


app.get('*', function (req, res) {
    res.status(404).end('error');
});

app.listen(3000, function () {
    console.log('listening')
});