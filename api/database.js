const mongoose = require('mongoose');

exports.init = ()=>{

    return new Promise((resolve, reject)=>{

        mongoose.connect('mongodb://localhost/sae-chat');

        mongoose.connection.on('error', (err)=>{

            reject(err);

        });

        mongoose.connection.once('open', ()=>{

            resolve();

        });

    });

};