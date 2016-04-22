$(function( $ ) {
	'use strict';

	var data = window.dvaf1Data = { selected: {} };
	var formView = $( '#dvaf1-form-view' );


	function parseValue( value ) {
		if ( /^true|false$/.test( value )) {
			return value === 'true';
		}
		return value;
	}


	// store state
	formView.on( 'change', function( event ) {
		var question = $( event.target );
		var name = event.target.name;
		var value = parseValue( $( event.target ).val() );

		data[ name ] = value;

		if ( question.is( 'select,:radio,:checkbox' )) {
			if ( question.is( ':checkbox' )) {
				data.selected[ name ][ value ] = event.target.checked;
			} else {
				data.selected[ name ] = {};
				data.selected[ name ][ value ] = true;
			}
		}
	});
});
