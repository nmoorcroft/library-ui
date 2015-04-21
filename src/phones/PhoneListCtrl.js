(function() {
    function PhoneListCtrl(PhoneListService) {
        this.PhoneListService = PhoneListService;
        this.phones = PhoneListService.findAll();
    }

    PhoneListCtrl.prototype.addPhone = function() {
        this.PhoneListService.addPhone();
    };

    angular.module('libraryApp').controller('PhoneListCtrl', PhoneListCtrl);

})();

