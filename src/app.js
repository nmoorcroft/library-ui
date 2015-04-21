(function() {

    angular.module('libraryApp', []);

    angular.module('libraryApp').constant('api_url', '/* @echo api_url */');

    /* @if debug != true */
    angular.module('libraryApp').config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });
    /* @endif */


})();

