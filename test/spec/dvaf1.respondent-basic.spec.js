'use strict';


var RespondentBasicView = require( '../page/dvaf1.respondentBasic.view.js' );
var respondentView;
var SituationView = require( '../page/dvaf1.situation.view.js' );
var situationView;
var AggrievedBasicView = require( '../page/dvaf1.aggrievedBasic.view.js' );
var aggrievedView;


describe( 'respondent (basic) view', function() {
	beforeEach(function() {
		respondentView = new RespondentBasicView();
		respondentView.get();
	});

	it( 'should have a title', function() {
		expect( respondentView.title ).toEqual( 'Respondent’s details (person the aggrieved is seeking protection from)' );
	});

	it( 'should show the correct initial questions', function() {
		expect( respondentView.visibleQuestions.count() ).toEqual( 6 );
	});

	it( 'should use refer to the aggrieved generically by default', function() {
		expect( respondentView.firstQuestionPrompt ).toBe( 'Who does the aggrieved need protection from?' );
	});

	it( 'should use refer to the aggrieved in first person when relevant', function() {
		situationView = new SituationView();
		situationView.get();
		situationView.chooseUserIsAggrieved();
		situationView.continue();
		situationView.continue();

		expect( respondentView.firstQuestionPrompt ).toBe( 'Who do you need protection from?' );
	});

	it( 'should use refer to the aggrieved by relationship', function() {
		situationView = new SituationView();
		situationView.get();
		situationView.chooseAggrievedIsUsers( 'brother' );
		situationView.continue();
		situationView.continue();

		expect( respondentView.firstQuestionPrompt ).toBe( 'Who does your brother need protection from?' );
	});

	xit( 'should use refer to the aggrieved by name', function() {
		aggrievedView = new AggrievedBasicView();
		aggrievedView.get();
		aggrievedView.setAggrieved({ firstName: 'Kim' });
		aggrievedView.continue();

		expect( respondentView.firstQuestionPrompt ).toBe( 'Who does Kim need protection from?' );
	});
});
