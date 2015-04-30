describe('BookService', function () {

    var BookService, $httpBackend;

    beforeEach(module('library.books', function ($provide) {
        $provide.constant('api_url', '/api');
    }));

    beforeEach(inject(function ($injector) {
        BookService = $injector.get('BookService');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all books from api', function () {
        $httpBackend.expectGET('/api/books').respond([{name: 'book1'}, {name: 'book2'}]);
        BookService.findAllBooks().then(function (books) {
            expect(books.length).toBe(2);
            expect(books[0]).toEqual(jasmine.objectContaining({name: 'book1'}));
            expect(books[1]).toEqual(jasmine.objectContaining({name: 'book2'}));
        });
        $httpBackend.flush();
    });

    it('should get a book by id from api', function () {
        $httpBackend.expectGET('/api/books/54db78938bad35071d36d38f').respond({name: 'book1'});
        BookService.findById('54db78938bad35071d36d38f').then(function (book) {
            expect(book).toEqual(jasmine.objectContaining({name: 'book1'}));
        });
        $httpBackend.flush();

    });

    it('should save a new book', function () {
        $httpBackend.expectPOST('/api/books').respond(201);
        BookService.createBook('book1', 'description');
        $httpBackend.flush();

    });


});

