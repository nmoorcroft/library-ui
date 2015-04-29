(function() {

    angular.module('config', []).constant('api_url', '/* @echo api_url */');

    var app = angular.module('app', ['config', 'ngRoute', 'book']);

    /* @if debug != true */
    app.config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });
    /* @endif */

    app.config(function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/books'});
    });

})();

