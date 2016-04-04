/* global Handlebars */

// onready
$(function( $ ) {
	'use strict';

	var template = Handlebars.compile( $( '#dvaf1-story-template' ).html() );

	$( document.body ).append( template );

});
