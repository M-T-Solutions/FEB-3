const { MongoClient } = require('mongodb')
const DB = require('../config/db');

/* let dbConnection

module.exports = {

    connectToDb: (cb) => {
        MongoClient.connect(DB.URI)
            .then((client) => {
                dbConnection = client.db()
                return cb()
        })
            .catch(err => {
                console.log(err)
                return cb(err)
        })

    },

    getDb: () => dbConnection

    } */

let mongoose = require('mongoose');

// Create Books model
let bookModel = mongoose.Schema({
    Name: String,
    Author: String,
    Published: Number,
    Description: String,
    Price: Number,
    },
    {
        collection: "Books"
});



module.exports = mongoose.model('Books', bookModel);

