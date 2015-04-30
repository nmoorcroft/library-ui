(function () {

    var library = angular.module('library', [
        'ngRoute',
        'library.config',
        'library.books'
    ]);

    library.config(function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/books'});
    });

    angular.module('library.config', []).constant('api_url', '/api');

})();


