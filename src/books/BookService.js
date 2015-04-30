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

    BookService.prototype.createBook = function (name, description) {
        var book = new this.Book({name: name, description: description});
        book.save();
    };

    angular.module('library.books').service('BookService', BookService);


})();

