angular.module('chatApp', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'btford.socket-io'
]);

angular.module('chatApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider.state('main', {
        abstract:true,
        views:{
            header:{
                templateUrl: 'partial/header/header.html',
                controller:'HeaderCtrl'
            },
            sidebar:{
                templateUrl: 'partial/sidebar/sidebar.html',
                controller:'SidebarCtrl'
            }
        }
    });

    $stateProvider.state('main.chat', {
       url:'/',
        views:{
            'main@':{
                templateUrl: 'partial/main/main.html',
                controller:'MainCtrl',
                resolve:{
                    rooms:function(roomService){

                        return roomService.getRooms();

                    }
                }
            }
        }
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

})
    .constant('NET', { SIO_URL:'http://localhost:3033' });

angular.module('chatApp').run(function($rootScope, socketService) {

    socketService.connect();

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
