var app = angular.module('UserCRUDServiceEstatico', [])

app.service('UserCRUDServiceEstatico',['$http', function ($http) {

    this.editarUser = function editarUser(userTela,vm,index) {
        
        //altera o campo preEditar do user para true para que apareça o input text dentro da tabela
        userTela.preEditar = true;

        //salva o user com o campo preEditar = true
        vm.users[index] = userTela;

        //guarda uma cópia do user, criando o objeto 
        //userOriginal userOriginal new userOriginal()  
        //userOriginal =  vm.users[index]
        //em tempo de compilacao) para que quando cancelar a edição, volte com os valores originais
        vm.userOriginal = angular.copy(vm.users[index]);

        //limpa o formulario (setUSer(new User()))
        vm.user = {};

        return user; 
    }

    this.confirmarEditar = function confirmarEditar(user,vm,index){
        //altera o campo preEditar do user para false para que apareça readonly dos campos
        user.preEditar = false;
        
        vm.users[index] = user;
        vm.userOriginal = angular.copy(vm.users[index]);
        vm.user = {};

        return user;
    }

    this.cancelarEditarUser = function cancelarEditarUser(userTela,vm,index) {

        userTela = vm.userOriginal;
        userTela.preEditar = false;
        vm.users[index] = userTela;

        vm.user = {};

        return vm.user;
    }

    this.adicionarUser = function adicionarUser(userTela,vm){
        if (userTela!= null && userTela.name) {    
            console.log(vm.users.includes(userTela, 0));

            userTela.preEditar = false; 
            vm.users.push(userTela);
            vm.user = {};          
        } else {
            vm.errorMessage = 'Please enter a name!';
            vm.message = '';
        }
    }

    this.deleteUser = function deleteUser(vm,index){
        vm.users.splice(index,1);
    }
}]);