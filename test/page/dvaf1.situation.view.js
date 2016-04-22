'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var SituationView = function() {
	DvaForm1Page.call( this );
};


SituationView.prototype = Object.create( DvaForm1Page.prototype, {
	infoBoxHeading: {
		get: function() {
			return element( by.css( '.status.info > h2' )).getText();
		}
	},

	get: {
		value: function() {
			this.gotoSituationView();
		}
	},

	dangerQuestion: {
		get: function() {
			return element( by.id( 'dvaf1-aggrieved-danger-question' ));
		}
	},

	dangerAdvice: {
		get: function() {
			return element( by.id( 'dvaf1-info-aggrieved-danger' ));
		}
	},

	privacyQuestion: {
		get: function() {
			return element( by.id( 'dvaf1-aggrieved-privacy-question' ));
		}
	},

	privacyAdvice: {
		get: function() {
			return element( by.id( 'dvaf1-info-aggrieved-privacy' ));
		}
	}
});
SituationView.constructor = SituationView;


module.exports = SituationView;
