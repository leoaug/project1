(function(angular) {

    'use strict';
    
    angular
        .module('app', [
            'ngRoute',
            'UserCRUDServiceEstatico', 
            'UserCRUDService',
            'TarefaService',
            'bb.dropdown', 
            'bb.chip',
            'bb.table',
            'bb.alert',
        ]);
       
})(angular);