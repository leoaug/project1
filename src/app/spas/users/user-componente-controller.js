(function (angular) {
    'use strict';

    angular.module('app')
        .controller('UserComponenteCtrl', UserComponenteCtrl);

    UserComponenteCtrl.$inject = ['$rootScope', '$scope'];

    function UserComponenteCtrl($rootScope, $scope ) {

        var vm = this;

        vm.items = [
            'A primeira escolha!',
            'Mais uma escolha para você.',
            'Mas espere! Uma terceira!'
        ];
    
        vm.toggled = function(open) {
            console.log('Dropdown is now: ', open);
        };

    }
})(angular);