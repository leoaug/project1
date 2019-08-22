
//var TarefaService = angular.module('TarefaService', [])

angular.module('TarefaService', []).service('TarefaService',['$http', function ($http) {
	  
	   this.getTarefas = function getTarefas(vm){
	        return $http({
	          method: 'GET',
	          url: 'http://localhost:8080/listatarefas/rest/tarefa/listarTarefas'
	        })	        
	        .then(
				function success(response){
					vm.tarefas = angular.copy(response.data);
					//aicionando um novo atributo ao array de tarefas da tarefa
					angular.forEach(vm.tarefas, function(tarefa) {
						tarefa.preEditar = false;
			        });
					
					console.log(vm.tarefas);
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
		    	 vm.carregando = false;
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
}]);