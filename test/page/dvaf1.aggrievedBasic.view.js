'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var AggrievedBasicView = function() {
	DvaForm1Page.call( this );
};


AggrievedBasicView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			this.gotoAggrievedBasicView();
		}
	},

	firstQuestionPrompt: {
		get: function() {
			return element( by.css( 'legend > .label' )).getText();
		}
	},

	firstName: {
		get: function() {
			return element( by.name( 'aggrievedNameGiven' ));
		}
	},

	lastName: {
		get: function() {
			return element( by.name( 'aggrievedNameFamily' ));
		}
	},

	dateBirth: {
		get: function() {
			return element( by.name( 'aggrievedDateBirth' ));
		}
	},

	gender: {
		get: function() {
			return element( by.name( 'aggrievedGender' ));
		}
	}
});
AggrievedBasicView.constructor = AggrievedBasicView;


module.exports = AggrievedBasicView;
