(function(angular) {

    'use strict';
    
    angular
        .module('app', [
            'ngRoute',
            'ngMaterial',
            'ngMessages',
            'UsuarioService', 
            'TarefaService',
            'DialogService',
            'ToastService',
            'RedirectService',
            'bb.dropdown', 
            'bb.chip',
            'bb.table',
            'bb.alert',
        ])
        /*  setando o tema do material design
        .config(function($mdThemingProvider) {

		    // Configure a dark theme with primary foreground yellow
		
		    $mdThemingProvider.theme('docs-dark', 'default')
		      .primaryPalette('yellow')
		      .dark();
		
		  });
      
       */
        .config(function($mdDateLocaleProvider) {

        	$mdDateLocaleProvider.months = ['Janeiro', 'Fevereiro', 'Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        	$mdDateLocaleProvider.shortMonths = ['Jan', 'Fev', 'Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            $mdDateLocaleProvider.days = ['domingo', 'segunda', 'terça','quarta','quinta','sexta','sábado'];
            $mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter','Qua','Qui','Sex','Sab'];
        	
        	
		    $mdDateLocaleProvider.parseDate = function(dateString) {
			      var m = moment(dateString, 'DD/MM/YYYY', true);
			      return m.isValid() ? m.toDate() : new Date(NaN);
		    };  
		  
		    $mdDateLocaleProvider.formatDate = function(date) {
			      var m = moment(date);
			      return m.isValid() ? m.format('DD/MM/YYYY') : '';
		    };
    
        })
        
})(angular);