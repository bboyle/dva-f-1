'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var SituationView = function() {
	DvaForm1Page.call( this );
};


SituationView.prototype = Object.create( DvaForm1Page.prototype, {
	infoBoxHeading: {
		get: function() {
			return element.all( by.css( '.status.info' )).get( 0 ).element( by.css( 'h2' )).getText();
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
	},

	relationshipQuestion: {
		get: function() {
			return element( by.id( 'dvaf1-situation-relationship' ));
		}
	},

	relationshipQuestionLabelText: {
		get: function() {
			return this.relationshipQuestion.element( by.css( '.label' )).getText();
		}
	},

	relationshipQuestionPromptText: {
		get: function() {
			return this.relationshipQuestion.element( by.css( 'label' )).getText();
		}
	},

	existingOrderJurisdiction: {
		get: function() {
			return element( by.id( 'dvaf1-aggrieved-existing-order-jurisdiction' ));
		}
	},

	existingOrderAdvice: {
		get: function() {
			return element( by.id( 'dvaf1-aggrieved-existing-order-advice' ));
		}
	}
});
SituationView.constructor = SituationView;


module.exports = SituationView;
