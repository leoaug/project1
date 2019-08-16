(function (angular) {
    'use strict';


angular.module('app').controller('UsuarioCadastroCtrl', UsuarioCadastroCtrl);

UsuarioCadastroCtrl.$inject = ['$scope','UserCRUDServiceEstatico','UserCRUDService'];


function UsuarioCadastroCtrl($scope, UserCRUDServiceEstatico , UserCRUDService ) {
    
    var vm = this;

// ================== Atributos da Controller =========================
    vm.sexos = [ 
		{ sexoUsuarioEnum : "MASCULINO" },
		{ sexoUsuarioEnum : "FEMININO" }			 			   			
	];
 
    vm.errorMessage = "";
    vm.message = "";
    vm.carregando = true;
    
// ================= Carregando a table de usuários ===================   
    UserCRUDServiceEstatico.getUsuarios().then(
		function success(response){
			vm.usuarios = angular.copy(response.data);
			//aicionando um novoa tributo ao array de objetos do usuario
			angular.forEach(vm.usuarios, function(usuario) {
				usuario.preEditar = false;
	        });
		},
		function error(response) {
			if (response.status === 404 || response.status === -1){
				vm.errorMessage = "Erro ao carregar a tabela de usuários, servidor fora do ar, status: " + response.status; 
			} else {
				vm.errorMessage = "Código do Status " +response.status;
				console.log("Código do Status " +response.status );
			}
			
		}
    ).finally(function () {
    	 vm.carregando = false;
    });
    
 
//=================== funcoes da controller ==========================================
    
    vm.setSexo = setSexo;
    vm.setSexoUsuario = setSexoUsuario;
    vm.adicionarUsuario = adicionarUsuario;
    vm.excluirUsuario = excluirUsuario;
    vm.editarUsuario = editarUsuario; 
    vm.confirmarEditar = confirmarEditar;
    vm.cancelarEditarUsuario = cancelarEditarUsuario;
    
    
//==================== Implementações das funções do Controller ======================
    
    function setSexo(sexo) {
		//seta o sexo no objeto de usuario
    	vm.usuario.sexoUsuarioEnum = angular.copy(sexo.sexoUsuarioEnum);
        
	}
    
    function setSexoUsuario(sexo,usuarioTela) {
		
    	usuarioTela.sexoUsuarioEnum = angular.copy(sexo.sexoUsuarioEnum);
    	       
	}

    function adicionarUsuario(usuario) {
	     
    	UserCRUDServiceEstatico.adicionarUsuario(usuario,vm);
	      
	}
 

    function editarUsuario(usuario,index) {
    	
        UserCRUDServiceEstatico.editarUser(usuario,vm,index);
 
    }

    function confirmarEditar (usuario,index) {
       
    	UserCRUDServiceEstatico.confirmarEditar(usuario,vm,index);
    
    }

    function cancelarEditarUsuario (usuario,index) {
      
        UserCRUDServiceEstatico.cancelarEditarUsuario(usuario,vm,index);

    }
    

    function excluirUsuario (index) {      
        UserCRUDServiceEstatico.excluirUsuario(vm,index);  
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
  
    

}

})(angular);