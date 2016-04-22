'use strict';


var AggrievedBasicView = require( '../page/dvaf1.aggrievedBasic.view.js' );
var aggrievedView;


describe( 'aggrieved (basic) view', function() {
	beforeEach(function() {
		aggrievedView = new AggrievedBasicView();
		aggrievedView.get();
	});

	it( 'should have a title', function() {
		expect( aggrievedView.title ).toEqual( 'Aggrieved’s details (person in need of protection)' );
	});

	it( 'should show the correct initial questions', function() {
		expect( aggrievedView.visibleQuestions.count() ).toEqual( 6 );
	});

	it( 'should refer to the aggrieved generically by default', function() {
		expect( aggrievedView.firstQuestionPrompt ).toBe( 'What is the name of the person in need of protection?' );
	});

	it( 'should refer to the aggrieved in first person when relevant', function() {
		aggrievedView.chooseUserIsAggrieved();
		aggrievedView.get();

		expect( aggrievedView.firstQuestionPrompt ).toBe( 'What is your name?' );
	});

	it( 'should refer to the aggrieved by relationship', function() {
		aggrievedView.chooseAggrievedIsUsers( 'client' );
		aggrievedView.get();

		expect( aggrievedView.firstQuestionPrompt ).toBe( 'What is your client’s name?' );
	});

	it( 'should refer to the aggrieved generic when relationship is generic', function() {
		aggrievedView.chooseAggrievedIsUsers( 'someone' );
		aggrievedView.get();

		expect( aggrievedView.firstQuestionPrompt ).toBe( 'What is the name of the person in need of protection?' );
	});

});
