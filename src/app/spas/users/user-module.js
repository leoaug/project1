(function(angular) {

    'use strict';
    
    angular
        .module('app', [
            'ngRoute',
            'ngMaterial',
            'ngMessages',
            'UsuarioService', 
            'TarefaService',
            'RedirectService',
            'bb.dropdown', 
            'bb.chip',
            'bb.table',
            'bb.alert',
        ])
        /*  setando o tema do material design
        .config(function($mdThemingProvider) {

		    // Configure a dark theme with primary foreground yellow
		
		    $mdThemingProvider.theme('docs-dark', 'default')
		      .primaryPalette('yellow')
		      .dark();
		
		  });
      
       */
})(angular);