'use strict';


var SituationView = require( '../page/dvaf1.situation.view.js' );
var situationView;


describe( 'situation view', function() {
	beforeEach(function() {
		situationView = new SituationView();
		situationView.get();
	});

	it( 'should have a title', function() {
		expect( situationView.title ).toEqual( 'Your situation' );
	});

	it( 'should show the correct initial questions', function() {
		expect( situationView.visibleQuestions.count() ).toEqual( 3 );
	});

	it( 'should define "the aggrieved"', function() {
		situationView.chooseUserIsAggrieved();
		expect( situationView.infoBoxHeading ).toBe( 'You are the aggrieved' );

		situationView.chooseAggrievedIsUsers( 'daughter' );
		expect( situationView.infoBoxHeading ).toBe( 'Your daughter is the aggrieved' );
	});

});
