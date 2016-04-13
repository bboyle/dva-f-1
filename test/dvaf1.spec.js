'use strict';


var DvaForm1Page = require( './page/dvaf1.page.js' );
var page;


describe( 'begin page', function() {
	beforeEach(function() {
		page = new DvaForm1Page();
	});

	it( 'should have a title', function() {
		expect( browser.getTitle() ).toEqual( 'Prepare your application for a domestic violence protection order' );
		expect( element( by.css( 'h1' )).getText() ).toEqual( 'Prepare your application for a domestic violence protection order' );
		expect( page.title ).toEqual( 'Before you begin' );
	});

	it( 'should have a continue button', function() {
		expect( page.continueButton.getText() ).toEqual( 'Continue' );
	});
});


describe( 'story page', function() {
	beforeEach(function() {
		page = new DvaForm1Page();
		// continue from begin to story page
		page.continue();
	});

	it( 'should ask who needs protection', function() {
		var label = element( by.css( 'label '));
		expect( label.getText() ).toEqual( 'Do you need protection?' );
	});

});
