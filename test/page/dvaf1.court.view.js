'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var CourtView = function() {
	DvaForm1Page.call( this );
};


CourtView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			this.gotoCourtView();
		}
	},

	safetyFormInfo: {
		get: function() {
			return element( by.id( 'dvaf1-court-safety-info' ));
		}
	},

	safetyFormAttending: {
		get: function() {
			return element( by.id( 'dvaf1-court-safety-attending' ));
		}
	},

	safetyFormLeaving: {
		get: function() {
			return element( by.id( 'dvaf1-court-safety-leaving' ));
		}
	}

});
CourtView.constructor = CourtView;


module.exports = CourtView;
