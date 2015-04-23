(function () {
    function BookService(Book) {
        this.Book = Book;
    }

    BookService.prototype.findAllBooks = function () {
        return this.Book.findAll();
    };

    BookService.prototype.findById = function (id) {
        return this.Book.findById(id);
    };

    angular.module('libraryApp').service('BookService', BookService);


})();
