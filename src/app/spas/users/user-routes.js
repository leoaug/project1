(function(angular) {

    'use strict';

    angular.module('app').config(routes)
    
    routes.$inject = ['$routeProvider','$locationProvider'];
   
    function routes($routeProvider, $locationProvider) {
        
         // use the HTML5 History API
         //$locationProvider.html5Mode(true);
         //$locationProvider.hashPrefix('');
        
        $routeProvider
            .when('/', {
                templateUrl: '/app/spas/users/user-template.html',
                controller: 'UserTemplateCtrl',
                controllerAs: 'vm'
            })
            .when('/cadastroUsuario',{
                templateUrl: '/app/spas/users/usuario-cadastro/usuario-cadastro.html',
                controller: 'UsuarioCadastroCtrl',
                controllerAs: 'vm'
            })
            .when('/cadastroTarefa',{
        		templateUrl: "/app/spas/users/tarefa-cadastro/tarefa-cadastro.html",
        		controller: 'TarefaCadastroCtrl',
        		controllerAs: 'vm'
        	})
            .otherwise({
                redirectTo: '/'
            });
            
    }

  
    



})(angular);