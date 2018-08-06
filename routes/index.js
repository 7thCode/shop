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



