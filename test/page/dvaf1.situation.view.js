'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var SituationView = function() {
	DvaForm1Page.call( this );
};


SituationView.prototype = Object.create( DvaForm1Page.prototype, {
	// legalAdvice: {
	// 	get: function() {
	// 		return element( by.id( 'dvaf1-legal-advice' ));
	// 	}
	// },

	// radioRequestLegalAdvice: {
	// 	get: function() {
	// 		return element( by.id( 'legal-advice-how' ));
	// 	}
	// },

	// askForLegalAdvice: {
	// 	value: function() {
	// 		return this.radioRequestLegalAdvice.click();
	// 	}
	// }

	get: {
		value: function() {
			// navigate from home view
			this.continue();
		}
	}
});
SituationView.constructor = SituationView;


module.exports = SituationView;
