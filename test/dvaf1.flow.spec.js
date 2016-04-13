'use strict';

describe( 'sequential order', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get( 'http://localhost:8000/src/' );
	});

	it( 'should visit pages in order', function() {
		expect( browser.getTitle() ).toEqual( 'Prepare your application for a domestic violence protection order' );

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Before you begin' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formPreamble' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Your situation' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formStory' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Aggrieved’s details (person in need of protection)' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formAggrievedBasic' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Respondent’s details (person the aggrieved is seeking protection from)' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formRespondentBasic' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Relationship to the respondent' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formRelationship' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Why does the aggrieved need protection?' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formGrounds' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Request extra conditions' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formConditions' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Do you require urgent protection?' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formUrgent' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Aggrieved’s details (person in need of protection)' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formAggrieved' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Are there children who live or spend time with the aggrieved who need protection?' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formChildren' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Do relatives or associates need protection?' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formAssociates' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Respondent’s details (person the aggrieved is seeking protection from)' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formRespondent' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Details of any other orders' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formOrders' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Is this application being made on someone else’s behalf?' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formApplicant' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Preparing for court' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formCourt' );
		element( by.css( 'button' )).click();

		expect( element( by.css( 'h2' )).getText() ).toEqual( 'Download your application' );
		expect( element( by.css( 'form' )).getAttribute( 'name' )).toBe( 'formDownload' );
	});
});
