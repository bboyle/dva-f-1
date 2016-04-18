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


});
