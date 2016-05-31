const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    dateCreated : { type:Date, default:Date.now},
    name        : String

});

mongoose.model('Room', Schema);