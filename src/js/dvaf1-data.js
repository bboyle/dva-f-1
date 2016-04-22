/* global Handlebars */
$(function( $ ) {
	'use strict';

	var data = window.dvaf1Data = { selected: {} };
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


	// relevance
	formView.on( 'click change', function( event ) {
		var question = $( event.target );
		var name = event.target.name;
		var value = $( event.target ).val();

		// store data
		data[ name ] = parseValue( value );
		value = value.replace( /\s+/g, '' );

		if ( question.is( 'select,:radio,:checkbox' )) {
			// store boolean helpers
			if ( question.is( ':checkbox' )) {
				data.selected[ name ][ value ] = event.target.checked;
			} else {
				data.selected[ name ] = {};
				data.selected[ name ][ value ] = true;
			}

			// regenerate status blocks
			switch ( name ) {
			case 'userIsAggrieved':
			case 'userRelationship':
				refreshPartial( 'dvaf1-dfn-aggrieved' );
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
