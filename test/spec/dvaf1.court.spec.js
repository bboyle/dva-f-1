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

});
