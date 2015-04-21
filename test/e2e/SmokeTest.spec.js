describe('Smoke Test', function() {

    beforeEach(function() {
        browser.get('index.html');
    });

    it('should display add phone button', function() {
        expect(element(by.buttonText('Add Phone')).isPresent()).toBeTruthy();
    });

});