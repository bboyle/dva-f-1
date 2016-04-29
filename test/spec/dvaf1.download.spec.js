'use strict';


var DownloadView = require( '../page/dvaf1.download.view.js' );
var downloadView;


describe( 'download view', function() {
	beforeEach(function() {
		downloadView = new DownloadView();
		downloadView.get();
	});

	it( 'should have a title', function() {
		expect( downloadView.title ).toEqual( 'Download your application' );
	});

	xit( 'should show correct text for legal advice' );
	xit( 'should show correct text for court safety requests' );
	xit( 'should show correct text for TPO requests' );

	xit( 'should handle respondent pronouns', function() {
		// TODO jasmine unit tests
		// theRespondent
		// respondentTheyKnow
	});

	xit( 'should offer next steps' );
	xit( 'should support quick exit' );
	xit( 'should support app reset' );

});
