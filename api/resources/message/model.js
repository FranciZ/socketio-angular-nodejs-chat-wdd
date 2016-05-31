const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    content     : String,
    dateCreated : { type:Date, default:Date.now},
    room        : { type:String, ref:'Room'}

});

mongoose.model('Message', Schema);