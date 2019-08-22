(function(angular) {
	'use strict';

	angular.module('app')
			.controller('TarefaCadastroCtrl', TarefaCadastroCtrl);

	TarefaCadastroCtrl.$inject = [ '$scope', 'TarefaService', 'UsuarioService' ];

	function TarefaCadastroCtrl($scope, TarefaService , UsuarioService) {

		var vm = this;
		
		vm.errorMessage = "";
		vm.message = "";
		vm.carregando = true;
		    
// ================= Carregando o bb-dropdown de usuários ===================   
	    
	    UsuarioService.getUsuarios(vm);

	    
// ================= Carregando tarefas para o table de tarefas ============	    
	    
	    TarefaService.getTarefas(vm);
		
		
	}

})(angular);