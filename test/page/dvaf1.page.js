'use strict';


var DvaForm1Page = function() {
	browser.get( '/src/' );
};


DvaForm1Page.prototype = Object.create( {}, {
	title: {
		get: function() {
			return element.all( by.css( 'h2' )).get( 0 ).getText();
		}
	},

	continueButton: {
		get: function() {
			return element( by.css( 'strong > button' ));
		}
	},

	form: {
		get: function() {
			return element( by.css( 'form' ));
		}
	},

	continue: {
		value: function() {
			this.continueButton.click();
		}
	},

	// general helpers
	focus: {
		value: function( element ) {
			element.sendKeys( '' );
		}
	}
});


module.exports = DvaForm1Page;
