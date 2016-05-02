/* global Handlebars */
$(function( $ ) {
	'use strict';

	var data = window.dvaf1Data = { selected: {} };
	data.MASCULINE_GENDER = /(^(man|male|he|him|his)$)|father|son|brother|nephew|uncle|husband|boy/i;
	data.FEMININE_GENDER  = /(^(her|she)$)|woman|female|mother|daughter|sister|neice|aunt|wife|girl/i;

	var formView = $( '#dvaf1-form-view' );

	var partials = {
		'dvaf1-dfn-aggrieved': {
			name: 'dfnAggrieved'
		},
		'dvaf1-info-aggrieved-danger': {
			name: 'infoAggrievedDanger'
		},
		'dvaf1-info-aggrieved-privacy': {
			name: 'infoAggrievedPrivacy'
		},
		'dvaf1-situation-relationship': {
			name: 'situationRelationshipQuestion'
		},
		'dvaf1-aggrieved-existing-order': {
			name: 'aggrievedExistingOrderQuestion'
		},
		'dvaf1-aggrieved-existing-order-advice': {
			name: 'infoExistingOrder'
		}
	};


	$.each( partials, function( key, partial ) {
		var template = $( '#' + key + '-partial' ).remove();
		if ( template.length ) {
			partial.template = Handlebars.compile( template.html() );
			Handlebars.registerPartial( partial.name, partial.template );
			return partial;
		} else {
			delete partials[ key ];
		}
	});


	function parseValue( value ) {
		if ( /^Yes|No$/.test( value )) {
			return value === 'Yes';
		}
		return value;
	}


	function refreshPartial( partial ) {
		$( '#' + partial ).html( partials[ partial ].template( data ));
	}


	function parseGender( key, value ) {
		data[ key ] = data.FEMININE_GENDER.test( value ) ? 'Woman' : data.MASCULINE_GENDER.test( value ) ? 'Man' : data[ key ];
	}

	// relevance
	formView.on( 'click change', function( event ) {
		var question = $( event.target );
		var name = event.target.name;
		var value = $( event.target ).val();

		// store data
		data[ name ] = parseValue( value );
		if ( value.length ) {
			value = value.replace( /\s+/g, '' );
		}

		if ( question.is( 'select,:radio,:checkbox' )) {
			// store boolean helpers
			if ( question.is( ':checkbox' )) {
				data.selected[ name ] = data.selected[ name ] || {};
				data.selected[ name ][ value ] = event.target.checked;
			} else {
				data.selected[ name ] = {};
				data.selected[ name ][ value ] = true;
			}

			// handle data changes
			switch ( name ) {
			case 'situationParty':
				parseGender( 'respondentGender', value );
				break;
			case 'userRelationship':
				parseGender( 'aggrievedGender', value );
				// fallthrough
			case 'userIsAggrieved':
				refreshPartial( 'dvaf1-dfn-aggrieved' );
				refreshPartial( 'dvaf1-situation-relationship' );
				refreshPartial( 'dvaf1-aggrieved-existing-order' );
				refreshPartial( 'dvaf1-aggrieved-existing-order-advice' );
				break;
			case 'userDanger':
				refreshPartial( 'dvaf1-info-aggrieved-danger' );
				break;
			case 'userPrivacy':
				refreshPartial( 'dvaf1-info-aggrieved-privacy' );
				break;
			case 'aggrievedExistingOrderJurisdiction':
				refreshPartial( 'dvaf1-aggrieved-existing-order-advice' );
				break;
			}
		}
	});
});
