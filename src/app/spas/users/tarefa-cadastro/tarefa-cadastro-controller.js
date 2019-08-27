(function(angular) {
	'use strict';

	angular.module('app')
			.controller('TarefaCadastroCtrl', TarefaCadastroCtrl);

	TarefaCadastroCtrl.$inject = [ '$scope','$location','$mdDialog', '$mdToast','$controller' , 'TarefaService', 'UsuarioService','RedirectService'];

	function TarefaCadastroCtrl($scope, $location , $mdDialog, $mdToast, $controller , TarefaService , UsuarioService, RedirectService) {

		var vm = this;
		
		vm.errorMessage = "";
		vm.message = "";
		vm.tarefa = {};
		vm.tarefa.statusTarefaEnum = "ATIVA";
		vm.statusTarefasEnums = [ 
			{ statusTarefaEnum : "ATIVA" },
			{ statusTarefaEnum : "CANCELADA" }			 			   			
		];

//================ Funcoes da controller ====================================		
		
		vm.adicionarTarefa = adicionarTarefa;
		vm.setUsuario = setUsuario;
		vm.editarTarefa = editarTarefa;

// =========== extende metodos que sao usados em ql controller =============
		
		angular.extend(vm, RedirectService);
		 		
// ================= Carregando o bb-dropdown de usuários ===================   
	    
		vm.carregando = true;
	    UsuarioService.getUsuarios(vm);

	    
// ================= Carregando tarefas para o table de tarefas ============	    
	    
	    vm.carregando = true;
	    TarefaService.getTarefas(vm);

// ================ Funcções da controler ==================================
	    
	    function setUsuario(usuario){
	    	
	    	vm.tarefa.usuario = angular.copy(usuario);
	    
	    }
	    
	    function adicionarTarefa(tarefa){
	    	
	    	TarefaService.adicionarTarefa(tarefa,vm,$mdToast);	    	
	    
	    }
	    
	    function editarTarefa(tarefa,index){
	    	
	    	TarefaService.editarTarefa(tarefa,vm,index);
	    	
	    }
		
	}

})(angular);