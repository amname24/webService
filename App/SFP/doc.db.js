var mongoose = require("mongoose");
var uuidv4 = require("uuid/v4");
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
    uri: String,
    label: String,
    docid: String,
    authors: String,
    title: String,
});

var DocModel = mongoose.model('documents', DocSchema);


module.exports = {

    add: function (doc, cb) {
        DocModel.count({
            docid: doc.docid,
        }, function (err, count) {
            if (err) {
                console.error();
            } else if (count == 0) {
                var nouveau = new DocModel({
                    _id: doc._id,
                    docid: doc.docid,
                    label: doc.label,
                    uri: doc.uri,
                    authors: doc.authors,
                    title: doc.title,
                });
                nouveau.save(function (err, resp) {
                    if (err) {
                        console.log("problème creation doc in the BD ");
                        console.error();
                    } else {
                        // console.log("a new doc is created in the BD ");
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
