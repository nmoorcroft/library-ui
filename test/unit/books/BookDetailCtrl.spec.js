describe('BookDetailCtrl', function () {

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
        var BookDetailCtrl = $controller('BookDetailCtrl as ctrl', {$scope: scope, book: {name:'book1'}});
        expect(scope.ctrl.book).toEqual({name:'book1'});
    });


});

