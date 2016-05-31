angular.module('chatApp').factory('roomService',function(
    socketService,
    $http,
    NET
) {

    var roomService = {
        currentRoom:{},
        rooms:[],

        joinRoom: function(room){

            angular.extend(roomService.currentRoom, room);
            socketService.socket.emit('join', room._id);

        },
        createRoom: function(data){

            var promise = $http.post(NET.SIO_URL+'/room', data);

            promise.then(function(res){

                roomService.rooms.push(res.data);

            });

            return promise;

        },
        getRooms:function(){

            var promise = $http.get(NET.SIO_URL+'/rooms');

            promise.then(function(res){

                roomService.rooms = res.data;

            });

            return promise;

        },
        getRoomMessages:function(roomId){

            var promise = $http.get(NET.SIO_URL+'/room/'+roomId+'/messages');

            promise.then(function(res){

                angular.extend(socketService.messages,res.data);

            });

            return promise;

        }
    };

    return roomService;
});
