(function(angular) {

    'use strict';

    angular.module('app').config(routes)
    
    routes.$inject = ['$routeProvider','$locationProvider'];
   
    function routes($routeProvider, $locationProvider) {
        
         // use the HTML5 History API
         $locationProvider.html5Mode(true);
         $locationProvider.hashPrefix('');
        
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