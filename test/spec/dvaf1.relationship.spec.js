'use strict';


var RelationshipView = require( '../page/dvaf1.relationship.view.js' );
var relationshipView;


describe( 'relationship view', function() {
	beforeEach(function() {
		relationshipView = new RelationshipView();
		relationshipView.get();
	});

	it( 'should have a title', function() {
		expect( relationshipView.title ).toEqual( 'The aggrieved wants protection from the respondent' );
	});

	it( 'should use correct pronouns', function() {
		relationshipView.chooseUserIsNotAggrieved();
		relationshipView.setAggrieved( relationshipView.KIM );
		relationshipView.setRespondent( relationshipView.ASHLEY );
		relationshipView.get();

		expect( relationshipView.title ).toEqual( 'Kim wants protection from Ashley' );

		relationshipView.chooseUserIsAggrieved();
		relationshipView.get();

		expect( relationshipView.title ).toEqual( 'You want protection from Ashley' );
	});

});
