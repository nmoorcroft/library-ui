(function() {

    angular.module('config', []).constant('api_url', '/* @echo api_url */');

    var app = angular.module('app', ['config', 'ngRoute', 'books']);

    /* @if debug != true */
    app.config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });
    /* @endif */

    app.config(function($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/books' });
    });

})();

