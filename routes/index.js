var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DocSchema = new Schema({
    email: String,
    fname: String,
    lname: String,
    subject: String,
    message: String
});

DocSchema.index({"email": 1}, {unique: true});

var Doc = mongoose.model('Doc', DocSchema);

mongoose.connect("mongodb://localhost/test", {});

router.post('/api/contact', function (request, response, next) {

    var email = request.body.email;
    var fname = request.body.fname;
    var lname = request.body.lname;
    var subject = request.body.subject;
    var message = request.body.message;

    var postdata = new Doc({email: email, fname: fname, lname: lname, subject: subject, message: message});

    postdata.save().then(function (saved_doc) {
        response.json(saved_doc);
    });

});

module.exports = router;

/*
var send_mail = function (to, callback) {

    var mailer = require('nodemailer');

    var mailsetting = {
        "service": "gmail",
        "auth": {
            "user": "inbox.7thcode@gmail.com",
            "pass": "33550336"
        }
    };

    var smtp_user = mailer.createTransport(mailsetting); //SMTPの接続

    var result_mail = {
        from: "oda.mikio@gmail.com",
        to: to,
        bcc: "oda.mikio@gmail.com",
        subject: "subject",
        html: "Message"
    };

    smtp_user.sendMail(result_mail, function (error) {
        callback(error);
        smtpUser.close();
    });

};
*/