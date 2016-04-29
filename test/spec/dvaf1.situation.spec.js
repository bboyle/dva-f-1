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
		expect( situationView.infoBoxHeading.isDisplayed() ).toBe( false );

		situationView.chooseUserIsAggrieved();
		expect( situationView.infoBoxHeading.isDisplayed() ).toBe( true );
		expect( situationView.infoBoxHeading ).toBe( 'You are the aggrieved' );

		situationView.chooseUserIsNotAggrieved();
		expect( situationView.infoBoxHeading.isDisplayed() ).toBe( false );

		situationView.chooseAggrievedIsUsers( 'daughter' );
		expect( situationView.infoBoxHeading.isDisplayed() ).toBe( true );
		expect( situationView.infoBoxHeading ).toBe( 'Your daughter is the aggrieved' );

		situationView.chooseAggrievedIsUsers( 'someone' );
		expect( situationView.infoBoxHeading.isDisplayed() ).toBe( true );
		expect( situationView.infoBoxHeading ).toBe( 'They are the aggrieved' );
	});

	it( 'should ask safety questions if user is the aggrieved', function() {
		expect( situationView.dangerQuestion.isDisplayed() ).toBe( false );
		expect( situationView.privacyQuestion.isDisplayed() ).toBe( false );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( false );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( false );

		situationView.chooseUserIsAggrieved();
		expect( situationView.dangerQuestion.isDisplayed() ).toBe( true );
		expect( situationView.privacyQuestion.isDisplayed() ).toBe( false );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( false );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( false );

		situationView.choose( 'userDanger', 'Yes' );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( true );
		expect( situationView.privacyQuestion.isDisplayed() ).toBe( true );
		expect( situationView.dangerAdvice.element( by.css( 'h2' )).getText() ).toBe( 'What can I do if I need help urgently?' );
		expect( situationView.dangerAdvice.element( by.css( 'a[href^="tel"]' )).getText() ).toBe( '000' );

		situationView.choose( 'userDanger', 'Maybe' );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( true );
		expect( situationView.privacyQuestion.isDisplayed() ).toBe( true );
		expect( situationView.dangerAdvice.element( by.css( 'h2' )).getText() ).toBe( 'What can I do if I need help urgently?' );
		expect( situationView.dangerAdvice.element( by.css( 'a[href^="tel"]' )).isPresent() ).toBe( false );

		situationView.choose( 'userDanger', 'No' );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( false );
		expect( situationView.privacyQuestion.isDisplayed() ).toBe( true );

		situationView.choose( 'userPrivacy', 'No' );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( true );
		expect( situationView.privacyAdvice.element( by.css( 'h2' )).getText() ).toBe( 'Protect yourself online' );

		situationView.choose( 'userPrivacy', 'Not sure' );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( true );
		expect( situationView.privacyAdvice.element( by.css( 'h2' )).getText() ).toBe( 'Different ways to apply for protection' );

		situationView.choose( 'userPrivacy', 'Yes' );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( false );
	});

	it( 'should ask about respondent relationship', function() {
		expect( situationView.relationshipQuestion.isDisplayed() ).toBe( false );
		situationView.chooseUserIsAggrieved();
		expect( situationView.relationshipQuestion.isDisplayed() ).toBe( false );
		situationView.choose( 'userDanger', 'No' );
		expect( situationView.relationshipQuestion.isDisplayed() ).toBe( false );
		situationView.choose( 'userPrivacy', 'Yes' );

		expect( situationView.relationshipQuestion.isDisplayed() ).toBe( true );
		expect( situationView.relationshipQuestionLabelText ).toBe( 'Who do you need protection from?' );
		expect( situationView.relationshipQuestionPromptText ).toBe( 'I need protection from my' );

		situationView.chooseAggrievedIsUsers( 'girlfriend' );
		expect( situationView.relationshipQuestionLabelText ).toBe( 'Who does your girlfriend need protection from?' );
		expect( situationView.relationshipQuestionPromptText ).toBe( 'My girlfriend needs protection from her' );
	});

	it( 'should ask about existing orders', function() {
		situationView.chooseUserIsAggrieved();

		expect( situationView.existingOrderJurisdiction.isDisplayed() ).toBe( false );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( false );

		situationView.choose( 'aggrievedExistingOrder', 'Yes' );
		expect( situationView.existingOrderJurisdiction.isDisplayed() ).toBe( true );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( false );

		situationView.select( 'aggrievedExistingOrderJurisdiction', 'QLD' );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( true );
		expect( situationView.existingOrderAdvice.element( by.css( 'h2' )).getText() ).toBe( 'You can vary the existing protection order' );

		situationView.select( 'aggrievedExistingOrderJurisdiction', 'Vic' );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( true );
		expect( situationView.existingOrderAdvice.element( by.css( 'h2' )).getText() ).toBe( 'You can register your protection order in Queensland' );

		situationView.select( 'aggrievedExistingOrderJurisdiction', 'NZ' );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( true );
		expect( situationView.existingOrderAdvice.element( by.css( 'h2' )).getText() ).toBe( 'You can register your protection order in Queensland' );

		situationView.select( 'aggrievedExistingOrderJurisdiction', 'Other' );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( true );
		expect( situationView.existingOrderAdvice.element( by.css( 'p' )).getText() ).toBe( 'Attach a copy of the existing protection order when you lodge this application.' );

		situationView.choose( 'aggrievedExistingOrder', 'No' );
		expect( situationView.existingOrderJurisdiction.isDisplayed() ).toBe( false );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( false );
	});

	it( 'should use gender pronouns when applicable', function() {
		situationView.chooseAggrievedIsUsers( 'girlfriend' );
		situationView.choose( 'aggrievedExistingOrder', 'Yes' );
		situationView.select( 'aggrievedExistingOrderJurisdiction', 'ACT' );

		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( true );
		expect( situationView.existingOrderAdvice.element( by.css( 'h2' )).getText() ).toBe( 'Your girlfriend can register her protection order in Queensland' );

		situationView.chooseAggrievedIsUsers( 'father' );
		situationView.select( 'aggrievedExistingOrderJurisdiction', 'NT' );
		expect( situationView.existingOrderAdvice.isDisplayed() ).toBe( true );
		expect( situationView.existingOrderAdvice.element( by.css( 'h2' )).getText() ).toBe( 'Your father can register his protection order in Queensland' );
	});

	it( 'should parse gender where possible', function() {
		situationView.chooseAggrievedIsUsers( 'brother' );
		situationView.select( 'situationParty', 'stepsister' );
		expect( situationView.relationshipQuestionPromptText ).toBe( 'My brother needs protection from his' );

		situationView.continue();
		expect( situationView.value( 'aggrievedGender' )).toBe( 'Man' );

		situationView.continue();
		expect( situationView.value( 'respondentGender' )).toBe( 'Woman' );
	});

});
