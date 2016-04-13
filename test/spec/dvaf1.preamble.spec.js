'use strict';


var PreambleView = require( '../page/dvaf1.preamble.view.js' );
var preamble;


describe( 'preamble page', function() {
	beforeEach(function() {
		preamble = new PreambleView();
	});

	it( 'should have a title', function() {
		expect( preamble.title ).toEqual( 'Before you begin' );
	});

	it( 'should have a continue button', function() {
		expect( preamble.continueButton.getText() ).toEqual( 'Continue' );
	});

	it( 'should use the respondent name in the court description', function() {
		expect( element( by.css( 'section > section > ul > li:last-child' )).getText() ).toMatch( /^The respondent/ );
	});

	it( 'should ask about legal advice', function() {
		expect( preamble.form.element( by.css( '.label:nth-child(1)' )).getText() ).toEqual( 'Do you need legal advice?' );
	});

	it( 'should show how to get legal advice when asked', function() {
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeFalsy();
		expect( preamble.legalAdvice.isPresent() ).toBe( false );

		preamble.askForLegalAdvice();
		expect( preamble.radioRequestLegalAdvice.getAttribute( 'checked' )).toBeTruthy();
		expect( preamble.radioRequestLegalAdvice ).toBe.checked;

		// verify continue button is hidden (do we care?)
		// verify selecting another choice restores continue
	});

});
