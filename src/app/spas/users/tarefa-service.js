
//var TarefaService = angular.module('TarefaService', [])

angular.module('TarefaService', []).service('TarefaService',['$http', function ($http) {
	  this.getTarefas = function getTarefas(){
	        return $http({
	          method: 'GET',
	          url: 'http://localhost:8080/listatarefas/rest/tarefa/listarTarefas'
	        });
	    }
}]);