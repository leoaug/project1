(function (angular) {
    'use strict';

    angular.module('app')
        .controller('UserTemplateCtrl', UserTemplateCtrl);

    UserTemplateCtrl.$inject = ['$rootScope', '$scope','$http','UserCRUDService'];

    function UserTemplateCtrl($rootScope, $scope ,$http,UserCRUDService) {

        var vm = this;

        //chamada rest de API (GET) ao iniciar a pagina
        vm.tarefas = UserCRUDService.getTarefas().then(
			function success(response){
				vm.tarefas = angular.copy(response.data);
				console.log(response.data);
			},
			function error(response) {
				console.log("Erro causa: " +response.data);
			}
        );
        
        // recomendacoes do angular pra declarar funcoes (metodos) da Controller
        vm.getItem = getItem;
        vm.toggled = toggled;
        
        vm.items = [
            { 
                id : 1, 
                nome : "A primeira escolha!",
                subItem : [
                    {
                        id : 1, nome :"SubItem 1 A primeira escolha!"
                    },
                    {
                        id : 2, nome :"SubItem 2 A primeira escolha!" 
                    },
                    {
                    	id: 3, nome: "aeee eleeee"
                    }
                    
                ]
            },
            { 
                id : 2, 
                nome : "Mais uma escolha para você.",
                subItem : [
                    {
                        id : 1, nome :"SubItem 1 Mais uma escolha para você."
                    },
                    {
                        id : 2, nome :"SubItem 2 Mais uma escolha para você."
                    },
                    {
                        id : 3, nome :"SubItem 3 Mais uma escolha para você."
                    }
                    
                ]
            },
            { 
                id : 3, 
                nome : 'Mas espere! Uma terceira!',
                subItem : [
                	{
                		id : 1 , nome : "subitem da terceira opcao"
                	}
                ]
            }            
        ];
    

        function toggled(open) {
            //console.log('Dropdown is now: ', open);
        }
        function getItem(itemTela){
            // Item item = new Item()
            // item = item
            vm.item = angular.copy(itemTela);
            console.log(vm.item);
            // imprimit objeto com o alert
            //alert(itemTela.toSource().nome);
        }

    }
})(angular);