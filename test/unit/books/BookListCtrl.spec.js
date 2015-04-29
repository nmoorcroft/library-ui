describe('PhoneListService', function() {

    var $httpBackend, $controller, $rootScope;

    beforeEach(module('config', function($provide) {
        $provide.constant('api_url', '/api');
    }));

    beforeEach(module('books'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all books from api', function() {
        $httpBackend.expectGET('/api/books').respond({});
        var scope = $rootScope.$new();
        var BookListCtrl = $controller('BookListCtrl', { $scope: scope });
        $httpBackend.flush();
    });


});

