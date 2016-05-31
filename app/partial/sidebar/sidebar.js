angular.module('chatApp').controller('SidebarCtrl',function(
    $scope,
    roomService,
    socketService
){

    $scope.room = {};
    $scope.rooms = roomService.rooms;
    $scope.currentRoom = roomService.currentRoom;
    $scope.createRoom = false;

    $scope.joinClick = function(room){

        socketService.messages.length = 0;

        roomService.getRoomMessages(room._id);
        roomService.joinRoom(room);

    };

    $scope.createRoomClick = function(){

        if($scope.createRoom){

            roomService.createRoom($scope.room);

        }

        $scope.createRoom = !$scope.createRoom;

    };

});
