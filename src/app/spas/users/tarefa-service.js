
//var TarefaService = angular.module('TarefaService', [])

angular.module('TarefaService', []).service('TarefaService',['$http', function ($http) {
	  this.getTarefas = function getTarefas(){
	        return $http({
	          method: 'GET',
	          url: 'http://localhost:8080/listatarefas/rest/tarefa/listarTarefas'
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