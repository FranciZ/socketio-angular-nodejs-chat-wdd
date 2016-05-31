angular.module('chatApp').factory('socketService',function(
    NET,
    socketFactory
) {

    var socketService = {
        socket:null,
        messages:[],
        connect:function(){

            var socketIo = io.connect(NET.SIO_URL, {path:'/socket.io'});

            socketService.socket = socketFactory({ ioSocket: socketIo});

            socketIo.on('message', function(data){

                socketService.messages.push(data);

            });

        },
        sendMessage:function(msg, roomId){

            socketService.socket.emit('message', {content:msg, roomId:roomId});

        }
    };

    return socketService;
});
