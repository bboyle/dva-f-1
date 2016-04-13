/* global Handlebars */

// onready
$(function( $ ) {
	'use strict';

	var formView = $( '#dvaf1-form-view' );
	var template = Handlebars.compile( $( '#dvaf1-begin-template' ).html() );

	formView.html( template );


	// handle form view navigation
	formView.on( 'submit', function(event) {
		event.preventDefault();

		template = Handlebars.compile( $( '#dvaf1-story-template' ).html() );
		formView.html( template );
	});

});
