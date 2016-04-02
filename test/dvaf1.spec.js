'use strict';

// spec.js
describe('first test', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get('http://localhost:8000/src/');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('DVA-F1');
	});

});