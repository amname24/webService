var mongoose = require("mongoose");
var uuid = require("uuid");
// var bcrypt = require("bcrypt");


var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/hal', function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Mongo Database : connected');
    }
});

var DocSchema = Schema({
    _id: String,
    uri: {
        type: String,
        unique: true
    },
    authors: String,
    title: String,
    description: String
});

var DocModel = mongoose.model('documents', DocSchema);


module.exports = {

    add: function (doc, cb) {
        DocModel.count({
            uri: doc.uri,
        }, function (err, count) {
            if (err) {
                console.error();
            } else if (count == 0) {
                var nouveau = new DocModel({
                    _id: uuid(),
                    uri: doc.uri,
                    authors: doc.authors,
                    title: doc.title,
                    description: doc.description
                });
                nouveau.save(function (err, resp) {
                    if (err) {
                        console.log("problème creation doc in the BD ");
                        console.error();
                    } else {
                        cb(resp, true);
                    }
                });
            } else {
                // console.log("this docid was saved before " + doc.docid)
                cb(count, false);
            }
        })
    },
    
};
