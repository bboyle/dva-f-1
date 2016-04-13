'use strict';

describe( 'begin page', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get( 'http://localhost:8000/src/' );
	});

	it( 'should have a title', function() {
		expect( browser.getTitle() ).toEqual( 'Prepare your application for a domestic violence protection order' );
		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Before you begin' );
	});

	it( 'should have a continue button', function() {
		expect( element( by.css( 'button' )).getText() ).toEqual( 'Continue' );
	});
});


describe( 'story page', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get( 'http://localhost:8000/src/' );
		// continue from begin to story page
		element( by.css( 'button' )).click();
	});

	it( 'should have a title', function() {
		expect( browser.getTitle() ).toEqual( 'Prepare your application for a domestic violence protection order' );
		expect( element( by.css( 'h1' )).getText() ).toEqual( 'Prepare your application for a domestic violence protection order' );
	});

	it( 'should ask who needs protection', function() {
		var label = element( by.css( 'label '));
		expect( label.getText() ).toEqual( 'Do you need protection?' );
	});

});
