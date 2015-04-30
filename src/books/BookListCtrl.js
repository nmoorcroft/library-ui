(function () {
    function BookListCtrl(books) {
        this.books = books;
    }

    angular.module('library.books')
        .controller('BookListCtrl', BookListCtrl)
        .config(function ($routeProvider) {
            $routeProvider.when('/books', {
                templateUrl: 'books/book-list.html',
                controller: 'BookListCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    books: function (BookService) {
                        return BookService.findAllBooks();
                    }
                }
            });
        });

})();
