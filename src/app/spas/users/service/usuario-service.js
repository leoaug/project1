
angular.module('UsuarioService', []).service('UsuarioService', UsuarioService);

UsuarioService.$inject = ['$http','$httpParamSerializer', 'DialogService','ToastService'];

function UsuarioService($http, $httpParamSerializer, DialogService,ToastService) {
	
	this.getUsuarios = function getUsuarios(vm){
	    
		DialogService.mostrarDialog();
    	
    	return $http({
          method: 'GET',
          url: 'http://localhost:8080/listatarefas/rest/usuario/listarUsuarios'
        })
        .then(
			function success(response){
				vm.usuarios = angular.copy(response.data);
				//aicionando um novoa tributo ao array de objetos do usuario
				angular.forEach(vm.usuarios, function(usuario) {
					usuario.preEditar = false;
		        });
				
			},
			function error(response) {
				if (response.status === 404 || response.status === -1){
					vm.errorMessage = "Erro ao carregar a tabela de usuários , causa : " + response.data + ", status: " + response.status; 
				} else {
					vm.errorMessage = "Código do Status " +response.status;
					console.log("Código do Status " +response.status );
				}
				vm.message = "";
				vm.errorMessage = "Erro ao carregar os usuários, causa: " + JSON.parse(JSON.stringify(response.data)) + " Código do Status " +response.status;
			}
	    ).finally(function () {
	    	DialogService.esconderDialog();
	    });
	        
	       
	 }

	
    this.editarUsuario = function editarUsuario(usuarioTela,vm,index) {
        
        //altera o campo preEditar do user para true para que apareça o input text dentro da tabela
        usuarioTela.preEditar = true;

        //salva o user com o campo preEditar = true
        vm.usuarios[index] = usuarioTela;

        //guarda uma cópia do usuario antes de sua edição, para poder cancelar
        vm.usuariosOriginal[index] = angular.copy(vm.usuarios[index]);
        
      
    }

    this.confirmarEditar = function confirmarEditar(usuarioTela,vm,index){
    	
    	//deletar esse atributo do usuario, pois ele não existe no json do backEnd , e da erro 400
    	delete usuarioTela.preEditar;   	
    	
    	$http({
            method: 'PUT',            
            headers: {
            	'Content-Type': 'application/json'
            },            
            url: 'http://localhost:8080/listatarefas/rest/usuario/alterarUsuario',
            data: JSON.parse(JSON.stringify(usuarioTela))
        })          
        .then(
    		function success(response){
		    	//altera o campo preEditar do user para false para que apareça readonly dos campos
    			usuarioTela.preEditar = false;
		        
		        vm.usuarios[index] = usuarioTela;
		        vm.usuariosOriginal[index] = angular.copy(vm.usuarios[index]);
		        vm.usuario = {}; 
		        
		        ToastService.criarToastMensagem("Usuário editado.","toast-info","top right",3000);
		        
		        //vm.message = "Usuário editado."
  	            vm.errorMessage = ''; 
  	            
  	            
  	            
  			},
  			function error(response) {
  				if (response.status === 404){
  					console.log("Endpoint Fora ");
  				} else {
  					vm.errorMessage = "Código do Status " +response.status;
  					console.log("Código do Status " +response.status );
  				}
  				
  				vm.message = "";
				vm.errorMessage = "Erro ao confirmar a edição do usuário, causa: " + JSON.parse(JSON.stringify(response.data)) + " Código do Status " +response.status;
  				
  			}
       );
    	

        return usuarioTela;
    }

    
    
    this.cancelarEditarUsuario = function cancelarEditarUsuario(usuarioTela,vm,index) {

    	//recuperando o usuário do valor original
        usuarioTela = vm.usuariosOriginal[index];
        
        usuarioTela.preEditar = false;
        
        vm.usuarios[index] = usuarioTela;

    }

    this.adicionarUsuario = function adicionarUsuario(usuarioTela,vm){
          
        if (usuarioTela != null && usuarioTela.nome && usuarioTela.sexoUsuarioEnum) {    
        	        	
        	$http({
                method: 'POST',
                headers: {
                	'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/listatarefas/rest/usuario/salvarUsuario',
                data: JSON.stringify(usuarioTela)
            })          
            .then(
    		    function success(response){
    				
    		    	usuarioTela.preEditar = false; 
    		    	
    		    	usuarioTela.id = JSON.stringify(response.data.id);
    	           
    	            vm.usuarios.push(usuarioTela);   	           
    	            
    	            console.log(vm.usuarios);
    	            
    	            vm.usuario = {}; 
    	                	                	            
    	            ToastService.criarToastMensagem("Usuário cadastrado.","toast-info","top right",3000);
    	            	
    	            vm.errorMessage = ''; 
    	            
    			},
    			function error(response) {
    				if (response.status === 404){
    					console.log("Endpoint Fora ");
    				} else {   					
    					console.log("Código do Status " +response.status );
    				}
    				
    				vm.message = "";
    				vm.errorMessage = "Erro ao adicionar o usuário, causa: " + JSON.parse(JSON.stringify(response.data)) + " Código do Status " +response.status;
    			}
            );
        	  
        } else {
            vm.errorMessage = 'Entre com o nome e o sexo!';
            vm.message = '';
            console.log(vm.errorMessage);
        }
    }
   
  
    
    this.confirmarExcluirUsuario = function confirmarExcluirUsuario(vm,index,event,mdToast){
    	
    	var confirm = DialogService.mostrarDialogConfirm("Deseja Excluir o usuário?","Excluir o(a) " + vm.usuarios[index].nome + "?","Confirmar","Cancelar");
    	
    	confirm.then(function() {           
 	    	  excluirUsuario(vm,index,mdToast);
        }, function() {
           console.log("Cancelado");
        });
    	
    	
    }

    function excluirUsuario(vm,index){
    	
    	$http({
            method: 'DELETE',    
            headers: {
            	'Content-Type': 'application/json'
            },
            url: 'http://localhost:8080/listatarefas/rest/usuario/excluirUsuario',
            params:  {
                id: vm.usuarios[index].id
            }
        })          
        .then(
		    function success(response){	
		    	vm.usuarios.splice(index,1);
		    		    
		    	ToastService.criarToastMensagem("Usuário excluído.","toast-info","top right",3000);
		    	
		    	vm.errorMessage = "";
			},
			function error(response) {
				if (response.status === 404){
					console.log("Endpoint Fora "+ response.data);
				} else {
					vm.errorMessage = "Código do Status " +response.status;
					console.log("Código do Status " +response.status );
				}
				vm.message = "";
				vm.errorMessage = "Erro ao excluir o usuário, causa: " + JSON.parse(JSON.stringify(response.data)) + " Código do Status " +response.status;
			}
        );
    
    	
    }


}