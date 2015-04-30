(function () {
    function BookDetailCtrl(book) {
        this.book = book;
    }

    angular.module('library.books')
        .controller('BookDetailCtrl', BookDetailCtrl)
        .config(function ($routeProvider) {
            $routeProvider.when('/books/:bookId', {
                templateUrl: 'books/book-detail.html',
                controller: 'BookDetailCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    book: function (BookService, $route) {
                        return BookService.findById($route.current.params['bookId']);
                    }
                }
            });
        });

})();
