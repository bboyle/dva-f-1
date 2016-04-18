/* global Handlebars */


// onready
$(function( $ ) {
	'use strict';

	var interview = {};
	var formView = $( '#dvaf1-form-view' );
	var views = {
		formPreamble: {
			id: 'dvaf1-preamble-template',
			relevance: {
				'#dvaf1-legal-advice': {
					name: 'legalAdvice',
					value: 'How do I get legal advice?'
				},
				'.footer': {
					name: 'legalAdvice',
					values: [
						'Continue to prepare an application for a protection order',
						'I\'ve already talked to a lawyer'
					]
				}
			}
		},
		formSituation: {
			id: 'dvaf1-situation-template'
		},
		formAggrievedBasic: {
			id: 'dvaf1-aggrieved-basic-template'
		},
		formRespondentBasic: {
			id: 'dvaf1-respondent-basic-template'
		},
		formRelationship: {
			id: 'dvaf1-relationship-template'
		},
		formGrounds: {
			id: 'dvaf1-grounds-template'
		},
		formConditions: {
			id: 'dvaf1-conditions-template'
		},
		formUrgent: {
			id: 'dvaf1-urgent-template'
		},
		formAggrieved: {
			id: 'dvaf1-aggrieved-template'
		},
		formChildren: {
			id: 'dvaf1-children-template'
		},
		formAssociates: {
			id: 'dvaf1-associates-template'
		},
		formRespondent: {
			id: 'dvaf1-respondent-template'
		},
		formOrders: {
			id: 'dvaf1-orders-template'
		},
		formApplicant: {
			id: 'dvaf1-applicant-template'
		},
		formCourt: {
			id: 'dvaf1-court-template'
		},
		formDownload: {
			id: 'dvaf1-download-template'
		}
	};

	var viewSequence = [
		'formPreamble',
		'formSituation',
		'formAggrievedBasic',
		'formRespondentBasic',
		'formRelationship',
		'formGrounds',
		'formConditions',
		'formUrgent',
		'formAggrieved',
		'formChildren',
		'formAssociates',
		'formRespondent',
		'formOrders',
		'formApplicant',
		'formCourt',
		'formDownload'
	];

	var page = 0;

	views = $.each( views, function( key, view ) {
		view.template = Handlebars.compile( $( '#' + view.id ).html() );
	});

// TODO where should focus be when new page is shown!?
	function showPage( index ) {
		var view = views[ viewSequence[ index ]];
		formView.html( $( view.template( interview )) );

		$.each( view.relevance, function( target, condition ) {
			formView.find( target ).relevance( 'relevantWhen', condition );
		});
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
