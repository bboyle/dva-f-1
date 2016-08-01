'use strict';


var PreambleView = require( '../page/dvaf1.preamble.view.js' );
var preamble;


describe( 'app accessibility', function() {
	beforeEach(function() {
		preamble = new PreambleView();
	});

	it( 'should keep radio button state when updating view', function() {
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeFalsy();
		expect( preamble.legalAdvice.isDisplayed() ).toBe( false );

		preamble.askForLegalAdvice();
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeTruthy();
		expect( preamble.legalAdvice.isDisplayed() ).toBe( true );
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeTruthy();
	});

	it( 'should keep radio button focus when updating view', function() {
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeFalsy();

		preamble.askForLegalAdvice();
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeTruthy();

		// use keyboard to select next radio button
		preamble.radioRequestLegalAdvice.sendKeys( protractor.Key.ARROW_DOWN );
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeFalsy();
	});

});
