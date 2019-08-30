

	angular.module('app').controller('UsuarioCadastroCtrl', UsuarioCadastroCtrl);
	
	UsuarioCadastroCtrl.$inject = ['$scope','$location','UsuarioService','RedirectService','DialogService'];
	
	
	function UsuarioCadastroCtrl($scope, $location, UsuarioService ,RedirectService ,DialogService) {
	    
	    var vm = this;
	  
	 // =========== extende metodos que sao em comum para qualquer controller =============    
	    
	    angular.extend(vm, RedirectService);
	    
	
	// ================== Atributos da Controller =========================
	    vm.sexos = [ 
			{ sexoUsuarioEnum : "MASCULINO" },
			{ sexoUsuarioEnum : "FEMININO" }			 			   			
		];
	 
	    vm.errorMessage = "";
	    vm.message = "";
	    vm.usuariosOriginal = [];
	    
	// ================= Carregando a table de usuários (usando promises sempre que tiver chamada ao servidor) ===================   
	    
	    DialogService.mostrarDialog();
	    
	    UsuarioService.getUsuarios(vm).then(
    		function success(response) {
    			DialogService.esconderDialog();
    		}
	    );
	    
	//=================== funcoes da controller ==========================================
	    
	    vm.setSexo = setSexo;
	    vm.setSexoUsuario = setSexoUsuario;
	    vm.adicionarUsuario = adicionarUsuario;
	    vm.editarUsuario = editarUsuario; 
	    vm.confirmarEditar = confirmarEditar;
	    vm.cancelarEditarUsuario = cancelarEditarUsuario;
	    vm.confirmarExcluirUsuario = confirmarExcluirUsuario;
	    
	    
	//==================== Implementações das funções do Controller ======================
	    
	    function setSexo(sexo) {
			//seta o sexo no objeto de usuario
	    	vm.usuario.sexoUsuarioEnum = angular.copy(sexo.sexoUsuarioEnum);
	        
		}
	    
	    function setSexoUsuario(sexo,usuarioTela) {
			
	    	usuarioTela.sexoUsuarioEnum = angular.copy(sexo.sexoUsuarioEnum);
	    	       
		}
	
	    function adicionarUsuario(usuario) {
		     
	    	UsuarioService.adicionarUsuario(usuario,vm);
		      
		}
	 
	
	    function editarUsuario(usuario,index) {
	    	
	        UsuarioService.editarUsuario(usuario,vm,index);
	 
	    }
	
	    function confirmarEditar (usuario,index) {
	       
	    	UsuarioService.confirmarEditar(usuario,vm,index);
	    
	    }
	
	    function cancelarEditarUsuario (usuario,index) {
	      
	        UsuarioService.cancelarEditarUsuario(usuario,vm,index);
	
	    }
	    
	    function confirmarExcluirUsuario(index,event) {
	    	
	    	UsuarioService.confirmarExcluirUsuario(vm,index,event);
	   	
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
	   
	    */
	  
	    
	
	}

