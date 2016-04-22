/* global Handlebars, dvaf1Data */
$(function( $ ) {
	'use strict';

	var formView = $( '#dvaf1-form-view' );

	var partials = {
		dfnAggrieved: {
			id: 'dvaf1-dfn-aggrieved-partial'
		}
	};

	var views = {
		formPreamble: {
			id: 'dvaf1-preamble-template',
			relevance: {
				'#dvaf1-legal-advice': {
					name: 'legalAdvice',
					value: 'How do I get legal advice?'
				}
			}
		},
		formSituation: {
			id: 'dvaf1-situation-template',
			relevance: {
				'#dvaf1-dfn-aggrieved': [{
					name: 'userIsAggrieved',
					value: 'true'
				}, {
					name: 'userRelationship',
					values: '*'
				}],
				'#dvaf1-user-relationship-placeholder': {
					name: 'userIsAggrieved',
					value: 'false',
					negate: true
				},
				'#dvaf1-user-relationship': {
					name: 'userIsAggrieved',
					value: 'false'
				}
			}
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

	var viewSequence = [];

	var page = 0;

	$.each( partials, function( key, partial ) {
		var template = $( '#' + partial.id ).remove();
		if ( template.length ) {
			partial.template = Handlebars.compile( template.html() );
			Handlebars.registerPartial( key, partial.template );
			return partial;
		} else {
			delete partials[ key ];
		}
	});

	$.each( views, function( key, view ) {
		var template = $( '#' + view.id ).remove();
		if ( template.length ) {
			view.template = Handlebars.compile( template.html() );
			viewSequence.push( key );
			return view;
		} else {
			delete views[ key ];
		}
	});


	function processCondition( view, condition ) {
		if ( condition.values === '*' ) {
			condition.values = $.map( $( view.find( 'form' ).get( 0 ).elements[ condition.name ]).find( 'option' ), function( option ) {
				return option.value ? option.value : null;
			});
		}
		return condition;
	}


	function showPage( index ) {
		var view = views[ viewSequence[ index ]];
		formView.html( $( view.template( dvaf1Data )) );

		$.each( view.relevance, function( target, condition ) {
			if ( $.isArray( condition )) {
				$.each( condition, function( i, condition ) {
					formView.find( target ).relevance( 'relevantWhen', processCondition( formView, condition ));
				});
			} else {
				formView.find( target ).relevance( 'relevantWhen', processCondition( formView, condition ));
			}
		});
	}


	// handle form view navigation
	formView.on( 'submit', function( event ) {
		event.preventDefault();

		page++;

		if ( viewSequence[ page ]) {
			showPage( page );
		} else if ( event.target.action ) {
			window.location.replace( event.target.action );
		}
	});


	// relevance
	formView.on( 'change', function( event ) {
		var question = $( event.target );
		var name = event.target.name;

		if ( question.is( 'select,:radio,:checkbox' )) {
			// regenerate status blocks
			switch ( name ) {
			case 'userIsAggrieved':
			case 'userRelationship':
				$( '#dvaf1-dfn-aggrieved' ).html( partials.dfnAggrieved.template( dvaf1Data ));
				break;
			}
		}
	});


	// init
	showPage( page );

});