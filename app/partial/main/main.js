angular.module('chatApp').controller('MainCtrl',function(
    $scope,
    socketService,
    roomService
){

    $scope.message = {};
    $scope.messages = socketService.messages;

    $scope.onKeyUp = function(event){

        if(event.keyCode === 13){

            socketService.sendMessage($scope.message.content, roomService.currentRoom._id);
            $scope.message.content = '';

        }

    };

    socketService.socket.on('message',function(data){

        console.log(data);

    });

});
