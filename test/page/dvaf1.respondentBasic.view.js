'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var RespondentBasicView = function() {
	DvaForm1Page.call( this );
};


RespondentBasicView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			this.gotoRespondentBasicView();
		}
	},

	firstQuestionPrompt: {
		get: function() {
			return element( by.css( 'legend > .label' )).getText();
		}
	},

	firstName: {
		get: function() {
			return element( by.name( 'respondentNameGiven' ));
		}
	},

	lastName: {
		get: function() {
			return element( by.name( 'respondentNameFamily' ));
		}
	},

	dateBirth: {
		get: function() {
			return element( by.name( 'respondentDateBirth' ));
		}
	},

	gender: {
		get: function() {
			return element( by.name( 'respondentGender' ));
		}
	}

});
RespondentBasicView.constructor = RespondentBasicView;


module.exports = RespondentBasicView;
