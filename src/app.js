(function() {

    var libraryApp = angular.module('libraryApp', ['ngRoute']);

    libraryApp.constant('api_url', '/* @echo api_url */');

    /* @if debug != true */
    libraryApp.config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });
    /* @endif */

    libraryApp.config(function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/books'});
    });

})();

