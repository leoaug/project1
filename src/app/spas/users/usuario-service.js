var app = angular.module('UserCRUDServiceEstatico', [])

app.service('UserCRUDServiceEstatico',['$http','$httpParamSerializer', function ($http,$httpParamSerializer) {

    this.editarUser = function editarUser(usuarioTela,vm,index) {
        
        //altera o campo preEditar do user para true para que apareça o input text dentro da tabela
        usuarioTela.preEditar = true;

        //salva o user com o campo preEditar = true
        vm.usuarios[index] = usuarioTela;

        //guarda uma cópia do user, criando o objeto 
        //usuarioOriginal usuarioOriginal new usuarioOriginal()  
        //usuarioOriginal =  vm.usuarios[index]
        //em tempo de compilacao) para que quando cancelar a edição, volte com os valores originais
        vm.usuarioOriginal = angular.copy(vm.usuarios[index]);

        //limpa o formulario (setUSer(new User()))
        vm.usuario = {};

        return usuarioTela; 
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
		        vm.usuarioOriginal = angular.copy(vm.usuarios[index]);
		        vm.usuario = {}; 
		        vm.message = "Usuário editado."
  	            vm.errorMessage = ''; 
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
    	

        return usuarioTela;
    }

    this.cancelarEditarUsuario = function cancelarEditarUsuario(usuarioTela,vm,index) {

        usuarioTela = vm.usuarioOriginal;
        usuarioTela.preEditar = false;
        vm.usuarios[index] = usuarioTela;

        vm.usuario = {};

        return usuarioTela;
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
    	            vm.usuarios.push(usuarioTela);
    	            vm.usuario = {}; 
    	            vm.message = "Usuário cadastrado."
    	            vm.errorMessage = ''; 
    			},
    			function error(response) {
    				if (response.status === 404){
    					console.log("Endpoint Fora ");
    				} else {   					
    					console.log("Código do Status " +response.status );
    				}
    				
    				vm.errorMessage = "Erro ao cadastrar usuário, Código do Status " +response.status;
    				
    			}
            );
        	  
        } else {
            vm.errorMessage = 'Entre com o nome e o sexo!';
            vm.message = '';
            console.log(vm.errorMessage);
        }
    }
    this.getUsuarios = function getUsuarios(){
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/listatarefas/rest/usuario/listarUsuarios'
        });
    }

    this.excluirUsuario = function excluirUsuario(vm,index){
    	console.log(vm.usuarios[index].id);
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
		    	vm.message = "Usuário excluído."
			},
			function error(response) {
				if (response.status === 404){
					console.log("Endpoint Fora ");
				} else {
					vm.errorMessage = "Código do Status " +response.status;
					console.log("Código do Status " +response.status );
				}
				vm.errorMessage = "Erro ao excluir o usuário, Código do Status " +response.status;
			}
        );
    	
    	
    	
    }
}]);