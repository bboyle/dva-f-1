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
	}
});
SituationView.constructor = SituationView;


module.exports = SituationView;
