/* global Handlebars */
$(function( $ ) {
	'use strict';

	var data = window.dvaf1Data = {
		selected: {},
		event: [ {} ],
		child: [ {} ],
		associate: [ {} ]
	};
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
		},
		'dvaf1-grounds-event': {
			name: 'repeatGroundsEvent'
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
		var index;

		if ( question.is( 'button.add, button.del' )) {
			return;
		}

		// store data
		if (/^(event|child|associate)[0-9]+\./.test( name )) {
			// repeating fields
			index = name.replace( /^(?:event|child|associate)([0-9]+).*$/, '$1' ),
			name = name.split( /[0-9]+\./ );
			data[ name[ 0 ]][ index ] = data[ name[ 0 ]][ index ] || {};
			data[ name[ 0 ]][ index ][ name[ 1 ]] = value;

		} else {
			data[ name ] = parseValue( value );
			if ( value.length ) {
				value = value.replace( /\s+/g, '' );
			}
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


	function renumberControls( section, n ) {
		var heading = $( '.h3', section );
		heading.text( heading.text().replace( /\d+/, n + 1 ));

		$( 'input, select, textarea', section ).each(function( j, control ) {
			control.id = control.id.replace( /\d+/, n );
			control.name = control.name.replace( /\d+/, n );
		});
		$( 'label', section ).each(function( j, label ) {
			label.htmlFor = label.htmlFor.replace( /\d+/, n );
		});
		$( 'button.add, button.del', section ).each(function( j, button ) {
			button = $( button );
			button.val( n ).html( button.html().replace( /\d+/, n + 1 ));
		});
	}


	// add repeating section
	$( document ).on( 'click', 'button.add', function() {
		var index = parseInt( this.value, 10 );
		var repeatData = data[ this.name ];
		var section = $( this ).closest( '.section' );

		// clean up data
		repeatData.splice( index + 1, 0, {} );

		if ( section.find( 'button.del' ).length === 0 ) {
			section.find( '.actions' ).append( '<li><em><button type="button" class="del" name="' + this.name + '" value="0"><i class="fa fa-minus-square"></i> Remove ' + this.name + ' 1</button></em></li>' );
		}

		// insert new section
		var clone = section.clone();
		$( 'input, select, textarea', clone ).each(function( j, control ) {
			control.value = '';
		});
		clone.insertAfter( section );

		index++;
		section.nextAll( '.section' ).each(function( i, section ) {
			renumberControls( section, index + i );
		});
	});


	// remove repeating section
	$( document ).on( 'click', 'button.del', function() {
		var index = parseInt( this.value, 10 );
		var repeatData = data[ this.name ];
		// clean up data
		repeatData.splice( index, 1 );
		if ( repeatData.length < 1 ) {
			repeatData[ 0 ] = {};
		}

		// clean up UI
		$( this ).closest( '.section' ).nextAll( '.section' ).each(function( i, section ) {
			if ( repeatData.length < 2 ) {
				$( 'button.del', section ).remove();
			}
			renumberControls( section, index + i );
		});
		$( this ).closest( '.section' ).remove();
	});


});
