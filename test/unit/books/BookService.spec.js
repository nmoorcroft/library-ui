describe('PhoneListService', function() {

    var BookService, $httpBackend;

    beforeEach(module('config', function($provide) {
        $provide.constant('api_url', '/api');
    }));

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
        BookService = $injector.get('BookService');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all books from api', function() {
        $httpBackend.expectGET('/api/books').respond({});
        BookService.findAllBooks();
        $httpBackend.flush();
    });


});

