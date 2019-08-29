angular.module('DialogService', []).service("DialogService",['$location','$mdDialog', function ($location,$mdDialog) {
	
	this.mostrarDialog = function mostrarDialog(){
    	
    	$mdDialog.show(
    			alert =	$mdDialog.alert()
				        .parent(angular.element(document.body))
				        .clickOutsideToClose(false)
				        //.fullscreen(true)
				        .title('Carregando...')
				        //.textContent('You can specify some description text in here.')
				        .ariaLabel('Alert Dialog Demo')
		    
        );
    	
    }
   
   this.esconderDialog = function esconderDialog(){	    	
	   $mdDialog.hide();	  
   }
   
   this.mostrarDialogConfirm = function mostrarDialogConfirm(titulo,textoCorpo,labelBotaoConfirmar,labelBotaoCancelar){
	   
       var confirm = $mdDialog.confirm()
             .title(titulo)
             .textContent(textoCorpo)
             .ariaLabel("Lucky day")
             .ok(labelBotaoConfirmar)
             .cancel(labelBotaoCancelar);
       
       
         return $mdDialog.show(confirm);
   }
	
}]);