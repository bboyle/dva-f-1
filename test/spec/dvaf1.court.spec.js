'use strict';


var CourtView = require( '../page/dvaf1.court.view.js' );
var courtView;


describe( 'download view', function() {
	beforeEach(function() {
		courtView = new CourtView();
		courtView.get();
	});

	it( 'should have a title', function() {
		expect( courtView.title ).toEqual( 'Preparing for court' );
	});

	it( 'should ask about safety concerns in court', function() {
		expect( courtView.safetyFormInfo.isDisplayed() ).toBe( false );
		expect( courtView.safetyFormAttending.isDisplayed() ).toBe( false );
		expect( courtView.safetyFormLeaving.isDisplayed() ).toBe( false );

		courtView.choose( 'aggrievedCourtSafetyConcern', 'Yes' );
		expect( courtView.safetyFormInfo.isDisplayed() ).toBe( true );
		expect( courtView.safetyFormAttending.isDisplayed() ).toBe( true );
		expect( courtView.safetyFormLeaving.isDisplayed() ).toBe( true );
	});

	it( 'should use correct pronouns', function() {
		courtView.choose( 'aggrievedCourtSafetyConcern', 'Yes' );

		expect( courtView.firstParagraph.getText() ).toBe( 'The respondent will be given a copy of the application which includes a notice to appear in court at the same time.' );
		expect( courtView.safetyFormAttending.element( by.css( '.label' )).getText() ).toBe( 'Are you concerned that you may be in danger while attending court?' );
		expect( courtView.safetyFormAttending.element( by.css( '.hint' )).getText() ).toBe( 'CONFIDENTIAL (not shared with the respondent)' );

		courtView.chooseUserIsNotAggrieved();
		courtView.setAggrieved( courtView.KIM );
		courtView.setRespondent( courtView.ASHLEY );
		courtView.get();

		expect( courtView.firstParagraph.getText() ).toBe( 'Ashley (the respondent) will be given a copy of the application which includes a notice to appear in court at the same time.' );
		expect( courtView.safetyFormAttending.element( by.css( '.label' )).getText() ).toBe( 'Are you concerned that Kim may be in danger while attending court?' );
		expect( courtView.safetyFormAttending.element( by.css( '.hint' )).getText() ).toBe( 'CONFIDENTIAL (not shared with Ashley)' );

		courtView.chooseUserIsAggrieved();
		courtView.get();

		expect( courtView.safetyFormAttending.element( by.css( '.label' )).getText() ).toBe( 'Are you concerned that you may be in danger while attending court?' );
	});

});
