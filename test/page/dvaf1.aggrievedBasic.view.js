'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var AggrievedBasicView = function() {
	DvaForm1Page.call( this );
};


AggrievedBasicView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			// navigate from home view
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
AggrievedBasicView.constructor = AggrievedBasicView;


module.exports = AggrievedBasicView;
