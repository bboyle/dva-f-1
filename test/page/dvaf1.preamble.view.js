'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var PreambleView = function() {
	DvaForm1Page.call( this );
};


PreambleView.prototype = Object.create( DvaForm1Page.prototype, {
	legalAdvice: {
		get: function() {
			return element( by.id( 'dvaf1-legal-advice' ));
		}
	},

	radioRequestLegalAdvice: {
		get: function() {
			return element( by.id( 'legal-advice-how' ));
		}
	},

	askForLegalAdvice: {
		value: function() {
			return this.radioRequestLegalAdvice.click();
		}
	}
});
PreambleView.constructor = PreambleView;


module.exports = PreambleView;
