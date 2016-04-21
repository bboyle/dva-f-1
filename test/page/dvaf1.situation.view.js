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

	radioUserIsAggrieved: {
		get: function() {
			return element( by.id( 'user-is-aggrieved-true' ));
		}
	},

	radioUserIsNotAggrieved: {
		get: function() {
			return element( by.id( 'user-is-aggrieved-false' ));
		}
	},

	chooseUserIsAggrieved: {
		value: function() {
			this.radioUserIsAggrieved.click();
		}
	},

	chooseAggrievedIsUsers: {
		value: function( relationship ) {
			this.radioUserIsNotAggrieved.click();
			element( by.name( 'userRelationship' )).element( by.css( 'option[value = "' + relationship + '"]' )).click();
		}
	},

	get: {
		value: function() {
			// navigate from home view
			this.continue();
		}
	}
});
SituationView.constructor = SituationView;


module.exports = SituationView;
