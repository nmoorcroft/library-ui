(function () {

    var library = angular.module('library', [
        'ngRoute',
        'library.config',
        'library.books'
    ]);

    /* @if debug != true */
    library.config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    });
    /* @endif */

    library.config(function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/books'});
    });

    angular.module('library.config', []).constant('api_url', '/* @echo api_url */');

})();

