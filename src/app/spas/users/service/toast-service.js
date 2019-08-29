angular.module('ToastService', []).service("ToastService",['$location','$mdToast', function ($location,$mdToast) {
	
 
     this.criarToastMensagem = function criarToastMensagem(mensagem, estiloToastCSS , posicao ,delay){
    	 $mdToast.show(
    		$mdToast.simple()
    	        .textContent(mensagem)
    	        .toastClass(estiloToastCSS)
    	        .position(posicao)
    	        .hideDelay(delay))
    	   .then(function() {
    	        console.log('Toast dismissed.');
    	   }).catch(function() {
    		   console.log('Toast failed or was forced to close early by another toast.');
    	});
    }
	
}]);
