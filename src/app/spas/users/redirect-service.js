angular.module('RedirectService', []).service("RedirectService",['$location', function ($location) {

    var redirectService = {};

    redirectService.redirect = function(url) {
    	$location.url(url);
    };

    return redirectService;
}]);