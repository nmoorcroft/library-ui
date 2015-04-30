(function () {
    function BookFactory($http, api_url) {

        function Book(book) {
            _.extend(this, book || {});
        }

        Book.findAll = function () {
            return $http.get(api_url + '/books').then(function (response) {
                return _.map(response.data, function (book) {
                    return new Book(book);
                });
            });
        };

        Book.findById = function (id) {
            return $http.get(api_url + '/books/' + id).then(function (response) {
                return new Book(response.data);
            });
        };

        Book.prototype.save = function () {
            return $http.post(api_url + '/books', this);
        };

        return Book;

    }

    angular.module('library.model').factory('Book', BookFactory);

})();
