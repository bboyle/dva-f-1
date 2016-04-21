'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var RespondentBasicView = function() {
	DvaForm1Page.call( this );
};


RespondentBasicView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			// navigate from home view
			this.continue();
			this.continue();
			this.continue();
		}
	},

	firstQuestionPrompt: {
		get: function() {
			return element( by.css( 'legend > .label' )).getText();
		}
	}
});
RespondentBasicView.constructor = RespondentBasicView;


module.exports = RespondentBasicView;
