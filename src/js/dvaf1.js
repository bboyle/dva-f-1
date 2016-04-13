/* global Handlebars */


// onready
$(function( $ ) {
	'use strict';

	var formView = $( '#dvaf1-form-view' );
	var view = [
		'dvaf1-preamble-template',
		'dvaf1-situation-template',
		'dvaf1-aggrieved-basic-template',
		'dvaf1-respondent-basic-template',
		'dvaf1-relationship-template',
		'dvaf1-grounds-template',
		'dvaf1-conditions-template',
		'dvaf1-urgent-template',
		'dvaf1-aggrieved-template',
		'dvaf1-children-template',
		'dvaf1-associates-template',
		'dvaf1-respondent-template',
		'dvaf1-orders-template',
		'dvaf1-applicant-template',
		'dvaf1-court-template',
		'dvaf1-download-template'
	];
	var page = 0;

	view = $.map( view, function( id ) {
		return Handlebars.compile( $( '#' + id ).html() );
	});

	function showPage( index ) {
		formView.html( view[ index ] );
	}


	// handle form view navigation
	formView.on( 'submit', function(event) {
		event.preventDefault();

		page++;
		showPage( page );
	});


	// init
	showPage( page );

});
