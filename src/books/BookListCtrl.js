(function () {
    function BookListCtrl(books) {
        this.books = books;
    }

    angular.module('libraryApp')
        .controller('BookListCtrl', BookListCtrl)
        .config(function($routeProvider) {
            $routeProvider.when('/books', {
                templateUrl: 'books/books.html',
                controller: 'BookListCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    books: function(BookService) {
                        return BookService.findAllBooks().then(function(books) {
                            return books;
                        });
                    }
                }
            });
        });

})();
