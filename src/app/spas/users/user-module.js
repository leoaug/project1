(function(angular) {

    'use strict';
    
    angular
        .module('app', [
            'ngRoute',
            'UsuarioService', 
            'TarefaService',
            'bb.dropdown', 
            'bb.chip',
            'bb.table',
            'bb.alert',
        ]);
       
})(angular);