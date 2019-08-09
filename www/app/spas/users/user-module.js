(function(angular) {

    'use strict';
    
    angular
        .module('app', [
            'ngRoute',
            'UserCRUDServiceEstatico',  
            'bb.dropdown', 
            'bb.chip',
            'bb.table',
        ]);
       
})(angular);