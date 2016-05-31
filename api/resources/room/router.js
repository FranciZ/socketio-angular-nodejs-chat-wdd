const mongoose = require('mongoose');

module.exports = (app)=>{

    app.get('/rooms', (req, res)=>{

        const Room = mongoose.model('Room');

        const q = Room.find();

        q.exec()
            .then((docs)=>{

                res.send(docs);

            })
            .catch((err)=>{

                res.status(400).send(err);
                
            });

    });

    app.post('/room', (req, res) => {

        const data = req.body;
        const Room = mongoose.model('Room');
        const room = new Room({

            name:data.name

        });

        room.save((err)=>{

            if(err){
                res.status(400).send(err);
            }else {
                res.send(room);
            }

        });

    });

};