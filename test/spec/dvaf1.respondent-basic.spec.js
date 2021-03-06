'use strict';


var RespondentBasicView = require( '../page/dvaf1.respondentBasic.view.js' );
var respondentView;


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

	it( 'should refer to the aggrieved generically by default', function() {
		expect( respondentView.firstQuestionPrompt ).toBe( 'Who does the aggrieved need protection from?' );
	});

	it( 'should refer to the aggrieved in first person when relevant', function() {
		respondentView.chooseUserIsAggrieved();
		respondentView.get();

		expect( respondentView.firstQuestionPrompt ).toBe( 'Who do you need protection from?' );
	});

	it( 'should refer to the aggrieved by relationship', function() {
		respondentView.chooseAggrievedIsUsers( 'brother' );
		respondentView.get();

		expect( respondentView.firstQuestionPrompt ).toBe( 'Who does your brother need protection from?' );
	});

	it( 'should refer to the aggrieved by name', function() {
		respondentView.setAggrieved( respondentView.KIM );
		respondentView.get();

		expect( respondentView.firstQuestionPrompt ).toBe( 'Who does Kim need protection from?' );
	});

	it( 'should remember respondent data that is entered', function() {
		respondentView.setRespondent({
			respondentNameGiven: 'Ashley',
			respondentNameFamily: 'Smith',
			respondentDateBirth: '22 June 1984',
			respondentGender: 'Man'
		});
		respondentView.continue();
		respondentView.get();

		expect( respondentView.firstName.getAttribute( 'value' )).toBe( 'Ashley' );
		expect( respondentView.lastName.getAttribute( 'value' )).toBe( 'Smith' );
		expect( respondentView.dateBirth.getAttribute( 'value' )).toBe( '22 June 1984' );
		expect( respondentView.gender.getAttribute( 'value' )).toBe( 'Man' );
	});


});
