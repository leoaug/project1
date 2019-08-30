
angular.module('TarefaService', []).service('TarefaService', TarefaService);

TarefaService.$inject = ['$http','$httpParamSerializer','DialogService','ToastService'];

function TarefaService($http, $httpParamSerializer, DialogService, ToastService) {
	 
	   this.getTarefas = function getTarefas(vm){
	      
		   return $http({
	          method: 'GET',
	          url: 'http://localhost:8080/listatarefas/rest/tarefa/listarTarefas'
	        })	        
	        .then(
				function success(response){
					vm.tarefas = angular.copy(response.data);
					//adicionando um novo atributo ao model 'tarefa' em todo o array de tarefas
					angular.forEach(vm.tarefas, function(tarefa) {
						tarefa.preEditar = false;
			        });	
					
				},
				function error(response) {
					if (response.status === 404 || response.status === -1){
						vm.errorMessage = "Erro ao carregar a tabela de tarefas , causa : " + response.data + ", status: " + response.status; 
					} else {
						vm.errorMessage = "Código do Status " +response.status;
						console.log("Código do Status " +response.status );
					}
					vm.message = "";
					vm.errorMessage = "Erro ao carregar as tarefas, causa: " + JSON.parse(JSON.stringify(response.data)) + " Código do Status " +response.status;
				}
		    ).finally(function () {
		    	console.log("getTarefas()");
		    });
	        
	  }
	  
	  this.getTarefasPorUsuario = function getTarefasPorUsuario(idUsuario,index){
	    	
	    	$http({
	            method: 'GET',    
	            headers: {
	            	'Content-Type': 'application/json'
	            },
	            url: 'http://localhost:8080/listatarefas/rest/tarefa/consultarTarefasPorUsuario',
	            params:  {
	            	idUsuario: idUsuario
	            }
	        })          
	        .then(
			    function success(response){	
			    	
			      console.log(response.data);
			    	
				},
				function error(response) {
					if (response.status === 404){
						console.log("Endpoint Fora ");
					} else {
						vm.errorMessage = "Código do Status " +response.status;
						console.log("Código do Status " +response.status );
					}
					vm.errorMessage = "Erro ao consultar as tarefas, Código do Status " +response.status;
				}
	        );
	    
	    	
	   }
	  
	   this.adicionarTarefa = function adicionarTarefa (tarefaTela,vm) {
		
		   
		   if (tarefaTela != null && tarefaTela.nome && tarefaTela.usuario && tarefaTela.dataInicio && tarefaTela.dataFim && tarefaTela.statusTarefaEnum) {    
	 
			   //deletar esse atributo do usuario, pois ele não existe no json do backEnd , e da erro 400
		    	//delete tarefaTela.usuario.preEditar;  
		    	delete tarefaTela.usuario.preEditar; 
		    	
	        	$http({
	                method: 'POST',
	                headers: {
	                	'Content-Type': 'application/json'
	                },
	                url: 'http://localhost:8080/listatarefas/rest/tarefa/salvarTarefa',
	                data: JSON.parse(JSON.stringify(tarefaTela))
	            })          
	            .then(
	    		    function success(response){
	    				
	    		    	tarefaTela.preEditar = false; 
	    		    	
	    		    	tarefaTela.id = JSON.stringify(response.data.id);
	    	           
	    	            vm.tarefas.push(tarefaTela);   	           
	    	            
	    	            console.log(vm.tarefas);
	    	            
	    	            vm.tarefa = {}; 
	    	            
	    	            vm.tarefa.statusTarefaEnum = "ATIVA";
	    	          	    
	    	            ToastService.criarToastMensagem("Tarefa cadastrado.","toast-info","top right",3000);
	    	            	    	            	    	            	
	    	            vm.errorMessage = ''; 
	    	            
	    			},
	    			function error(response) {
	    				if (response.status === 404){
	    					console.log("Endpoint Fora ");
	    				} else {   					
	    					console.log("Código do Status " +response.status );
	    				}
	    				
	    				vm.message = "";
	    				vm.errorMessage = "Erro ao adicionar a tarefa, causa: " + JSON.parse(JSON.stringify(response.data)) + " Código do Status " +response.status;
	    			}
	            );
	        	  
	        } else {
	            vm.errorMessage = 'Entre com os dados da tarefa obrigatória!';
	            vm.message = '';
	            console.log(vm.errorMessage);
	        }
		   
		   
	   }
	   
	   this.editarTarefa = function editarTarefa(tarefa , vm , index){
		   
		 //altera o campo preEditar do user para true para que apareça o input text dentro da tabela
		   tarefa.preEditar = true;

	        //salva o user com o campo preEditar = true
	        vm.tarefas[index] = tarefa;

	        //guarda uma cópia do usuario antes de sua edição, para poder cancelar
	        vm.tarefasOriginal[index] = angular.copy(vm.tarefas[index]);
	        
	       
	   }
	   
	   this.cancelarEditarTarefa = function cancelarEditarTarefa(tarefa,vm,index) {

	    	//recuperando a tarefa do valor original
		    tarefa = vm.tarefasOriginal[index];
		    tarefa.preEditar = false;
	        vm.tarefas[index] = tarefa;

	    }
	 
	   function criarToastMensagem(mensagem,mdToast){
	    	mdToast.show(
	    	   mdToast.simple()
	    	        .textContent(mensagem)
	    	        .toastClass("toast-info")
	    	        .position("top right")
	    	        .hideDelay(3000))
	    	   .then(function() {
	    	        console.log('Toast dismissed.');
	    	   }).catch(function() {
	    		   console.log('Toast failed or was forced to close early by another toast.');
	    	});
	    }
}