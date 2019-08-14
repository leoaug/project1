var UserCRUDService = angular.module('UserCRUDService', [])

UserCRUDService.service('UserCRUDService',['$http', function ($http) {
    this.getUser = function getUser(userId){
        return $http({
          method: 'GET',
          url: 'users/'+userId
        });
	  }
	
    this.addUser = function addUser(name, email){
        
        
        return $http({
          method: 'POST',
          url: 'users',
          data: {name:name, email:email}
        });
       
    }
	
    this.deleteUser = function deleteUser(id){
        return $http({
          method: 'DELETE',
          url: 'users/'+id
        })
    }
	
    this.editarUser = function editarUser(id,name,email){
        return $http({
          method: 'PATCH',
          url: 'users/'+id,
          data: {name:name, email:email}
        })
    }
	
    this.getAllUsers = function getAllUsers(){
        return $http({
          method: 'GET',
          url: 'users'
        });
    }
    
    this.getTarefas = function getTarefas(){
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/listatarefas/rest/tarefa/listarTarefas'
        });
    }

}]);