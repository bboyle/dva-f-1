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
		expect( situationView.privacyQuestion.isDisplayed() ).toBe( true );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( false );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( false );

		situationView.choose( 'userDanger', 'Yes' );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( true );
		expect( situationView.dangerAdvice.element( by.css( 'h2' )).getText() ).toBe( 'What can I do if I need help urgently?' );
		expect( situationView.dangerAdvice.element( by.css( 'a[href^="tel"]' )).getText() ).toBe( '000' );

		situationView.choose( 'userDanger', 'Maybe' );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( true );
		expect( situationView.dangerAdvice.element( by.css( 'h2' )).getText() ).toBe( 'What can I do if I need help urgently?' );
		expect( situationView.dangerAdvice.element( by.css( 'a[href^="tel"]' )).isPresent() ).toBe( false );

		situationView.choose( 'userDanger', 'No' );
		expect( situationView.dangerAdvice.isDisplayed() ).toBe( false );

		situationView.choose( 'userPrivacy', 'No' );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( true );
		expect( situationView.privacyAdvice.element( by.css( 'h2' )).getText() ).toBe( 'Protect yourself online' );

		situationView.choose( 'userPrivacy', 'Not sure' );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( true );
		expect( situationView.privacyAdvice.element( by.css( 'h2' )).getText() ).toBe( 'Different ways to apply for protection' );

		situationView.choose( 'userPrivacy', 'Yes' );
		expect( situationView.privacyAdvice.isDisplayed() ).toBe( false );
	});

});
