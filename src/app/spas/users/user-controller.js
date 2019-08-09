(function (angular) {
    'use strict';


angular.module('app').controller('UserCRUDCtrl', UserCRUDCtrl);

UserCRUDCtrl.$inject = ['$scope','UserCRUDServiceEstatico'];


function UserCRUDCtrl($scope,UserCRUDServiceEstatico) {
    
    var vm = this;

    vm.users = [];
    vm.errorMessage = "";
    vm.message = "";
    vm.alerts = [{
        type: 'success',
        icon: 'mi mi--check-circle', // colocar clase do ícone referente a biblioteca de ícones do canal
        text: 'Muito bem! Você leu com êxito esta mensagem de alerta importante.'
    }, {
        type: 'info',
        icon: 'mi mi--info', // colocar clase do ícone referente a biblioteca de ícones do canal
        text: 'Ótimo! Tudo está indo muito bem.'
    }, {
        type: 'warn',
        icon: 'mi mi--warning', // colocar clase do ícone referente a biblioteca de ícones do canal
        text: 'Aviso! Melhor verificar se está tudo bem.'
    }, {
        type: 'error',
        icon: 'mi mi--close', // colocar clase do ícone referente a biblioteca de ícones do canal
        text: 'Ah não! Mude algumas coisas e tente enviar novamente.'
    }];

    

    vm.getLastMessageTime = function (item) {
        return "ueeepaa";
    }

    vm.editarUser = function (user,index) {
       
        UserCRUDServiceEstatico.editarUser(user,vm,index);
 
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

    vm.confirmarEditar = function (user,index) {
        UserCRUDServiceEstatico.confirmarEditar(user,vm,index);
    }

    vm.cancelarEditarUser = function (user,index) {
      
        UserCRUDServiceEstatico.cancelarEditarUser(user,vm,index);


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

    vm.filtrarUserPorId = function(user){
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
    
    vm.adicionarUser = function (user) {
        
        UserCRUDServiceEstatico.adicionarUser(user,vm);
        
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