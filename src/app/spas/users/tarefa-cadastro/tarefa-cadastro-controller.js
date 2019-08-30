(function(angular) {
	'use strict';

	angular.module('app')
			.controller('TarefaCadastroCtrl', TarefaCadastroCtrl);

	TarefaCadastroCtrl.$inject = [ '$scope','$location', 'DialogService','$controller' , 'TarefaService', 'UsuarioService','RedirectService'];

	function TarefaCadastroCtrl($scope, $location , DialogService, $controller , TarefaService , UsuarioService, RedirectService) {

		var vm = this;
			
		vm.errorMessage = "";
		vm.message = "";
		vm.tarefa = {};
		vm.tarefa.statusTarefaEnum = "ATIVA";
		vm.tarefasOriginal = [];
		vm.statusTarefasEnums = [ 
			{ statusTarefaEnum : "ATIVA" },
			{ statusTarefaEnum : "CANCELADA" }			 			   			
		];

//================ Funcoes da controller ====================================		
		
		vm.adicionarTarefa = adicionarTarefa;
		vm.setUsuario = setUsuario;
		vm.setUsuarioTarefa = setUsuarioTarefa;
		vm.editarTarefa = editarTarefa;
		vm.cancelarEditarTarefa = cancelarEditarTarefa;

// =========== extende metodos que sao usados em ql controller =============
		
		angular.extend(vm, RedirectService);
		 		


// ================= Carregando o bb-dropdown de usuários e tarefas para o table de tarefas (usando promises (then) para chamadas no servidor) ===================   		
		
		DialogService.mostrarDialog();
		
		UsuarioService.getUsuarios(vm).then(
			 function success(response){	 
				 TarefaService.getTarefas(vm).then(
						 function success(response){
							 DialogService.esconderDialog();
						 }
				 );					 
			 }
		);
		
// ================ Funcções da controler ==================================
	    
	 
	    
	    function setUsuario(usuario){
	    	
	    	vm.tarefa.usuario = angular.copy(usuario);
	    
	    }
	    
	    function setUsuarioTarefa(usuario,tarefa) {
	    	
	    	tarefa.usuario = angular.copy(usuario);
	    
	    }
	    
	    function adicionarTarefa(tarefa){
	    	
	    	TarefaService.adicionarTarefa(tarefa,vm);	    	
	    
	    }
	    
	    function editarTarefa(tarefa,index){
	    	
	    	TarefaService.editarTarefa(tarefa,vm,index);
	    	
	    }
	    
	    function cancelarEditarTarefa(tarefa,index){
	    	
	    	TarefaService.cancelarEditarTarefa(tarefa,vm,index);
	    	
	    }
	    
		
	}

})(angular);