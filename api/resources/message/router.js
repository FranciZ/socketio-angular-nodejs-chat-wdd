const mongoose = require('mongoose');

module.exports = (app)=>{

    app.get('/room/:roomId/messages', (req, res)=>{

        const Message = mongoose.model('Message');
        const roomId = req.params.roomId;

        Message.find({room:roomId}, (err, docs)=>{

            if(err){
                res.status(400).send(err);
            }else{
                res.send(docs);
            }

        });


    });

};