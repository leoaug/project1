(function(angular) {
	'use strict';

	angular.module('app')
			.controller('TarefaCadastroCtrl', TarefaCadastroCtrl);

	TarefaCadastroCtrl.$inject = [ '$scope','$location','$controller' , 'TarefaService', 'UsuarioService','RedirectService'];

	function TarefaCadastroCtrl($scope, $location , $controller , TarefaService , UsuarioService, RedirectService) {

		var vm = this;
		
		vm.errorMessage = "";
		vm.message = "";

// =========== extende metodos que sao usados em ql controller =============
		
		angular.extend(vm, RedirectService);
		 		
// ================= Carregando o bb-dropdown de usuários ===================   
	    
		vm.carregando = true;
	    UsuarioService.getUsuarios(vm);

	    
// ================= Carregando tarefas para o table de tarefas ============	    
	    
	    vm.carregando = true;
	    TarefaService.getTarefas(vm);

		
	}

})(angular);