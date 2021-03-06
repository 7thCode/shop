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

// index

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

router.post('/api/contact', function (request, response, next) {

    var email = request.body.email;
    var fname = request.body.fname;
    var lname = request.body.lname;
    var subject = request.body.subject;
    var message = request.body.message;

    var postdata = new Doc({email: email, fname: fname, lname: lname, subject: subject, message: message});

    //var postdata = new Doc(request.body);

    postdata.save().then(function (saved_doc) {
        send_mail(request.body.email, (error) => {
            response.json(saved_doc);
        });
    });

});

router.get('/api/contact/:email', function (request, response, next) {

    var email = decodeURIComponent(request.params.email);

    Doc.findOne({email: email}).then(function (doc) {
        response.json(doc);
    });

});

router.get('/api/query', function (request, response, next) {

    Doc.find({}).then(function (docs) {
        response.json(docs);
    });

});

router.put('/api/contact/:email', function (request, response, next) {

    var email = decodeURIComponent(request.params.email);
    var value = request.params.value;

    Doc.findOneAndUpdate({email: email}, {$set:{value: value}}).then(function (updated_doc) {
        response.json(updated_doc);
    })

});

router.delete('/api/contact/:email', function (request, response, next) {

    var email = decodeURIComponent(request.params.email);

    Doc.findOneAndRemove({email: email}).then(function () {
        response.json({});
    })

});

module.exports = router;



