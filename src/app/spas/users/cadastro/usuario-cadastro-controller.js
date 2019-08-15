(function (angular) {
    'use strict';


angular.module('app').controller('UsuarioCadastroCtrl', UsuarioCadastroCtrl);

UsuarioCadastroCtrl.$inject = ['$scope','UserCRUDServiceEstatico','UserCRUDService','TarefaService'];


function UsuarioCadastroCtrl($scope, UserCRUDServiceEstatico , UserCRUDService , TarefaService) {
    
    var vm = this;

    //atributos da controller
    //vm.usuarios = [];
    UserCRUDServiceEstatico.getUsuarios().then(
		function success(response){
			vm.usuarios = angular.copy(response.data);
			//aicionando um novoa tributo ao array de objetos do usuario
			angular.forEach(vm.usuarios, function(usuario) {
				usuario.preEditar = false;
	        });
			console.log(vm.usuarios);
		},
		function error(response) {
			if (response.status === 404){
				console.log("Endpoint Fora ");
			} else {
				vm.errorMessage = "Código do Status " +response.status;
				console.log("Código do Status " +response.status );
			}
			
		}
     );
    
 
    vm.errorMessage = "";
    vm.message = "";
    
    // funcoes da controller
    vm.setSexo = setSexo;
    vm.setSexoUsuario = setSexoUsuario;
    vm.adicionarUsuario = adicionarUsuario;
 
    vm.sexos = [ 
    			{ sexoUsuarioEnum : "MASCULINO" },
    			{ sexoUsuarioEnum : "FEMININO" }			 			   			
    ];
    
    //chamada rest de API (GET) ao iniciar a pagina
    /* 
    TarefaService.getTarefas().then(
		function success(response){
			vm.tarefas = angular.copy(response.data);
		},
		function error(response) {
			if (response.status === 404){
				console.log("Endpoint Fora ");
			} else {
				vm.errorMessage = "Código do Status " +response.status;
				console.log("Código do Status " +response.status );
			}
			
		}
    );
    */
  
    function setSexo(sexo) {
		//seta o sexo no objeto de usuario
    	vm.usuario.sexoUsuarioEnum = angular.copy(sexo.sexoUsuarioEnum);
        
	}
    function setSexoUsuario(sexo,usuarioTela) {
		
    	usuarioTela.sexoUsuarioEnum = angular.copy(sexo.sexoUsuarioEnum);
    	
    	//seta o sexo no objeto de usuario
    	//vm.usuarios[index].sexo = angular.copy(sexo);
    	//vm.usuario = angular.copy(vm.usuarios[index]);
        
	}

    function adicionarUsuario(usuario) {
	     
    	
	        UserCRUDServiceEstatico.adicionarUsuario(usuario,vm);
	        
	        /* usando REST
	        UserCRUDService.addUser(vm.user.name, vm.user.email)
	            .then (function success(response){
	                vm.message = 'User added!';
	                vm.errorMessage = '';
	            },
	            function error(response){
	                vm.errorMessage = 'Error adding user!';
	                vm.message = '';
	        });
	        */
	       
	    }
 

    vm.editarUser = function (usuario,index) {
    	
        UserCRUDServiceEstatico.editarUser(usuario,vm,index);
 
        /*
        UserCRUDService.editarUser(id,name,email)
          .then(function success(response){
              vm.message = 'User data updated!';
              vm.errorMessage = '';
          },
          function error(response){
              vm.errorMessage = 'Error updating user!';
              vm.message = '';
          });
          */
    }

    vm.confirmarEditar = function (usuario,index) {
        UserCRUDServiceEstatico.confirmarEditar(usuario,vm,index);
    }

    vm.cancelarEditarUser = function (usuario,index) {
      
        UserCRUDServiceEstatico.cancelarEditarUser(usuario,vm,index);


        /*
        
        UserCRUDService.updateUser(id,name,email)
          .then(function success(response){
              vm.message = 'User data updated!';
              vm.errorMessage = '';
          },
          function error(response){
              vm.errorMessage = 'Error updating user!';
              vm.message = '';
          });
          */
    }

    /* 
    vm.filtrarUserPorId = function(usuario){
        var existe = false;
        angular.forEach(vm.users, function(userItem) {
            if (user.id == userItem.id) {    
                existe =  true;
            }
        });

        return existe;
       
    };
    
    vm.getUser = function (id) {        
        UserCRUDService.getUser(id)
          .then(function success(response){
              vm.user = response.data;
              vm.user.id = id;
              vm.message='';
              vm.errorMessage = '';
          },
          function error (response ){
              vm.message = '';
              if (response.status === 404){
                  vm.errorMessage = 'User not found!';
              }
              else {
                  vm.errorMessage = "Error getting user!";
              }
          });
    }
    */
  
    
    vm.deleteUser = function (index) {
       
        UserCRUDServiceEstatico.deleteUser(vm,index);
       
        /* 
        for (i in vm.users) {

            if (vm.users[i].id == id) {

                vm.users.splice(i, 1);

                vm.user = {};

            }

        }
    /
        /*
        UserCRUDService.deleteUser(vm.user.id)
          .then (function success(response){
              vm.message = 'User deleted!';
              vm.user = null;
              vm.errorMessage='';
          },
          function error(response){
              vm.errorMessage = 'Error deleting user!';
              vm.message='';
          })
          */
    }
    
    vm.getAllUsers = function () {
        UserCRUDService.getAllUsers()
          .then(function success(response){
              vm.users = response.data._embedded.users;
              vm.message='';
              vm.errorMessage = '';
          },
          function error (response ){
              vm.message='';
              vm.errorMessage = 'Error getting users!';
          });
    }

}

})(angular);