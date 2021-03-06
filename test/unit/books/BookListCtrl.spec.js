describe('BookListCtrl', function () {

    var $httpBackend, $controller, $rootScope;

    beforeEach(module('library.books'));

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all books from api', function () {
        var scope = $rootScope.$new();
        var BookListCtrl = $controller('BookListCtrl as ctrl', {$scope: scope, books: [{name: 'book1'}]});
        expect(scope.ctrl.books).toEqual([{name: 'book1'}]);
    });


});

