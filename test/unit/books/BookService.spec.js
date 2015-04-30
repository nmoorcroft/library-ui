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
        $httpBackend.expectGET('/api/books').respond({});
        BookService.findAllBooks();
        $httpBackend.flush();
    });

    it('should get a book by id from api', function () {
        $httpBackend.expectGET('/api/books/54db78938bad35071d36d38f').respond({});
        BookService.findById('54db78938bad35071d36d38f');
        $httpBackend.flush();
    });


});

