/* global Handlebars, dvaf1Data */
$(function( $ ) {
	'use strict';

	var formView = $( '#dvaf1-form-view' );
	var scrollReset = formView.offset();

	var views = {
		'dvaf1-preamble-template': {
			relevance: {
				'#dvaf1-legal-advice': {
					name: 'legalAdvice',
					value: 'How'
				}
			}
		},
		'dvaf1-situation-template': {
			relevance: {
				'#dvaf1-dfn-aggrieved': [{
					name: 'userIsAggrieved',
					value: 'Yes'
				}, {
					name: 'userRelationship',
					values: '*'
				}],
				'#dvaf1-user-relationship-placeholder': {
					name: 'userIsAggrieved',
					value: 'No',
					negate: true
				},
				'#dvaf1-user-relationship': {
					name: 'userIsAggrieved',
					value: 'No'
				},
				'#dvaf1-aggrieved-danger-question': {
					name: 'userIsAggrieved',
					value: 'Yes'
				},
				'#dvaf1-aggrieved-privacy-question': {
					name: 'userIsAggrieved',
					value: 'Yes'
				},
				'#dvaf1-info-aggrieved-danger': {
					name: 'userDanger',
					values: [ 'Yes', 'Maybe' ]
				},
				'#dvaf1-info-aggrieved-privacy': {
					name: 'userPrivacy',
					values: [ 'No', 'Not sure' ]
				},
				'#dvaf1-aggrieved-existing-order-jurisdiction': {
					name: 'aggrievedExistingOrder',
					value: 'Yes'
				},
				'#dvaf1-aggrieved-existing-order-advice': {
					name: 'aggrievedExistingOrderJurisdiction',
					values: [ 'ACT', 'NSW', 'NT', 'QLD', 'SA', 'Tas', 'Vic', 'WA', 'NZ', 'Other' ]
				}
			}
		},
		'dvaf1-aggrieved-basic-template': {},
		'dvaf1-respondent-basic-template': {},
		'dvaf1-relationship-template': {},
		'dvaf1-grounds-template': {},
		'dvaf1-conditions-template': {},
		'dvaf1-urgent-template': {},
		'dvaf1-aggrieved-template': {},
		'dvaf1-children-template': {},
		'dvaf1-associates-template': {},
		'dvaf1-respondent-template': {},
		'dvaf1-orders-template': {},
		'dvaf1-applicant-template': {},
		'dvaf1-court-template': {},
		'dvaf1-download-template': {}
	};

	var viewSequence = [];

	var page = 0;

	$.each( views, function( key, view ) {
		var template = $( '#' + key ).remove();
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


	function refresh() {
		formView.trigger( 'x-height-change' );
	}


	formView.on( 'relevant irrelevant', refresh );


	function showPage( index ) {
		var view = views[ viewSequence[ index ]];

		page = index;
		formView.html( $( view.template( dvaf1Data )) );

		if ( view.relevance ) {
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

		$( 'html, body' ).scrollTop( scrollReset.top ).scrollLeft( scrollReset.left );
		refresh();
	}


	// handle form view navigation
	formView.on( 'submit', function( event ) {
		if ( event.target.method.toUpperCase() === 'POST' ) {
			return; // abort
		}

		event.preventDefault();

		if ( viewSequence[ page + 1 ]) {
			showPage( page + 1 );
		} else if ( event.target.action ) {
			window.location.replace( event.target.action );
		}
	});


	// navigation by menu links
	$( document ).on( 'click', 'a', function( event ) {
		var target = event.target.href.split( '#' );
		if ( target.length > 1 ) {
			if ( /^dvaf1/.test( target[ 1 ] )) {
				target = viewSequence.indexOf( target[ 1 ]);
				if ( target !== -1 ) {
					event.preventDefault();
					showPage( target );
				}
			}
		}
	});


	// init
	showPage( page );

});
