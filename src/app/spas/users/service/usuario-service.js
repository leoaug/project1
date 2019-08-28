var app = angular.module('UsuarioService', [])

app.service('UsuarioService',['$http','$httpParamSerializer', function ($http,$httpParamSerializer) {

	

	
    this.editarUsuario = function editarUsuario(usuarioTela,vm,index) {
        
        //altera o campo preEditar do user para true para que apareça o input text dentro da tabela
        usuarioTela.preEditar = true;

        //salva o user com o campo preEditar = true
        vm.usuarios[index] = usuarioTela;

        //guarda uma cópia do usuario antes de sua edição, para poder cancelar
        vm.usuariosOriginal[index] = angular.copy(vm.usuarios[index]);
        
        //limpa o formulario (setUSer(new User()))
        //vm.usuario = {};

       // return usuarioTela; 
    }

    this.confirmarEditar = function confirmarEditar(usuarioTela,vm,index,mdToast){
    	
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
		        
		        criarToastMensagem("Usuário editado." ,mdToast);
		        
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

        //vm.usuario = {};

        //return usuarioTela;
    }

    this.adicionarUsuario = function adicionarUsuario(usuarioTela,vm,mdToast){
          
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
    	            
    	            //vm.message = "Usuário cadastrado."
    	            
    	            criarToastMensagem("Usuário cadastrado.",mdToast);
    	            
    	            	
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
    this.getUsuarios = function getUsuarios(vm,mdDialog){
        
    	
    	var dialog = mostrarDialog(mdDialog);
    	
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
				
				console.log(vm.usuarios);
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
	    	esconderDialog(mdDialog,dialog);
	    	vm.carregando = false;
	    });
        
        //return vm.usuarios;
       
    }
  
    
    this.confirmarExcluirUsuario = function confirmarExcluirUsuario(vm,index,event,mdDialog,mdToast){
    	
    	// Appending dialog to document.body to cover sidenav in docs app
        var confirm = mdDialog.confirm()
              .title('Deseja Excluir o usuário?')
              .textContent('Excluir o(a) ' + vm.usuarios[index].nome + "?")
              .ariaLabel('Lucky day')
              .targetEvent(event)
              .ok('Confimar')
              .cancel('Cancelar');
        
	      mdDialog.show(confirm).then(function() {
            //$scope.status = 'You decided to get rid of your debt.';
	    	  excluirUsuario(vm,index,mdToast);
          }, function() {
            //$scope.status = 'You decided to keep your debt.';
          });
    }

    function excluirUsuario(vm,index,mdToast){
    	
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
		    	//vm.message = "Usuário excluído.";
		    	criarToastMensagem("Usuário excluído.",mdToast);
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
    
    function mostrarDialog(mdDialog){
    	/* 
    	var alert = mdDialog.alert()
        			.parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        //.targetEvent(event)
        */
    	var alert; 
    	mdDialog.show(
    			alert =	mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(false)
				        .title('Carregando...')
				        //.textContent('You can specify some description text in here.')
				        .ariaLabel('Alert Dialog Demo')
		        //.ok('Got it!')
        //.targetEvent(ev)
      );
    	
    	return alert;
    }
    
    function esconderDialog(mdDialog,dialog){
    	
    	mdDialog.hide(dialog, "new foobar!");
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

}]);