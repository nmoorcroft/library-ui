describe('PhoneListService', function() {

    var PhoneListService;

    beforeEach(module('libraryApp'));

    beforeEach(inject(function($injector) {
        PhoneListService = $injector.get('PhoneListService');
    }));


    it('should add a new phone', function() {
        expect(PhoneListService.findAll()).toEqual([{ name:'phone 0', desc: 'some description' }]);
        PhoneListService.addPhone();
        expect(PhoneListService.findAll().length).toBe(2);

    });

});

