'use strict';


var PreambleView = require( '../page/dvaf1.preamble.view.js' );
var preamble;


describe( 'preamble page', function() {
	beforeEach(function() {
		preamble = new PreambleView();
	});

	it( 'should keep radio button state when updating view', function() {
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeFalsy();
		expect( preamble.legalAdvice.isPresent() ).toBe( false );

		preamble.askForLegalAdvice();
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeTruthy();
		expect( preamble.radioRequestLegalAdvice ).toBe.checked;
	});

	// TODO how to test what element has focus? document.activeElement!?
	xit( 'should keep radio button focus when updating view', function() {
		expect( preamble.radioRequestLegalAdviceHasFocus() ).toBe( false );
		preamble.focus( preamble.radioRequestLegalAdvice );
		expect( preamble.radioRequestLegalAdviceHasFocus() ).toBe( true );

		preamble.askForLegalAdvice();
		expect( preamble.radioRequestLegalAdviceHasFocus() ).toBe( true );
	});

});
