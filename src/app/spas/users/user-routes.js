(function(angular) {

    'use strict';

    angular.module('app').config(routes)
    
    routes.$inject = ['$routeProvider'];
   
    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/app/spas/users/user.html',
                controller: 'UserComponenteCtrl',
                controllerAs: 'vm'
            })
            .when('/cadastro',{
                templateUrl: '/app/spas/users/user-cadastro.html',
                controller: 'UserCRUDCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

  
    



})(angular);