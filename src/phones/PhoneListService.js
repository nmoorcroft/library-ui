(function () {
    function PhoneListService() {
        this.phones = [ {name:'phone 0', desc: 'some description'} ];
    }

    PhoneListService.prototype.findAll = function () {
        return this.phones;
    }

    PhoneListService.prototype.addPhone = function () {
        return this.phones.push( {name:'phone ' + this.phones.length, desc: 'some description'} );
    }

    angular.module('demoApp').service('PhoneListService', PhoneListService);

})();


