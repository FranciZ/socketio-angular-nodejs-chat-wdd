const cors          = require('cors');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

// Setup the express app
const express   = require('express');
const app       = express();

// Setup socket.io
const server    = require('http').Server(app);
const io        = require('socket.io')(server);

const _         = require('lodash');
const database  = require('./database');
const resources = require('./resources');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

database.init()
    .then(()=>{

        resources(app);

        server.listen(3033, ()=>{

            console.log('All is well!');

        });

    })
    .catch((err)=>{

        console.log(err);

    });



io.on('connection', (socket)=>{

    socket.on('message', (data)=>{

        const Message = mongoose.model('Message');

        const message = new Message({
            room    : data.roomId,
            content : data.content
        });

        message.save((err)=>{

            if(!err){
                io.sockets.in(data.roomId).emit('message', message);
            }else{
                console.log(err);
            }

        });

    });

    socket.on('join', (roomId) => {

        _.each(socket.rooms, (value, key)=>{

            socket.leave(key);

        });
        
        socket.join(roomId);

    });



});