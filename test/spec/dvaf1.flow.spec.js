'use strict';


var DvaForm1Page = require( '../page/dvaf1.page.js' );
var page;


describe( 'sequential order', function() {
	beforeEach(function() {
		page = new DvaForm1Page();
	});

	it( 'should visit pages in order', function() {
		expect( browser.getTitle() ).toEqual( 'Prepare your application for a domestic violence protection order' );

		expect( page.title ).toEqual( 'Before you begin' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formPreamble' );
		page.continue();

		expect( page.title ).toEqual( 'Your situation' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formStory' );
		page.continue();

		expect( page.title ).toEqual( 'Aggrieved’s details (person in need of protection)' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formAggrievedBasic' );
		page.continue();

		expect( page.title ).toEqual( 'Respondent’s details (person the aggrieved is seeking protection from)' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formRespondentBasic' );
		page.continue();

		expect( page.title ).toEqual( 'Relationship to the respondent' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formRelationship' );
		page.continue();

		expect( page.title ).toEqual( 'Why does the aggrieved need protection?' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formGrounds' );
		page.continue();

		expect( page.title ).toEqual( 'Request extra conditions' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formConditions' );
		page.continue();

		expect( page.title ).toEqual( 'Do you require urgent protection?' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formUrgent' );
		page.continue();

		expect( page.title ).toEqual( 'Aggrieved’s details (person in need of protection)' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formAggrieved' );
		page.continue();

		expect( page.title ).toEqual( 'Are there children who live or spend time with the aggrieved who need protection?' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formChildren' );
		page.continue();

		expect( page.title ).toEqual( 'Do relatives or associates need protection?' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formAssociates' );
		page.continue();

		expect( page.title ).toEqual( 'Respondent’s details (person the aggrieved is seeking protection from)' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formRespondent' );
		page.continue();

		expect( page.title ).toEqual( 'Details of any other orders' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formOrders' );
		page.continue();

		expect( page.title ).toEqual( 'Is this application being made on someone else’s behalf?' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formApplicant' );
		page.continue();

		expect( page.title ).toEqual( 'Preparing for court' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formCourt' );
		page.continue();

		expect( page.title ).toEqual( 'Download your application' );
		expect( page.form.getAttribute( 'name' )).toBe( 'formDownload' );
	});
});
