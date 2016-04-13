'use strict';


var DvaForm1Page = function() {
	browser.get( '/src/' );
};


DvaForm1Page.prototype = Object.create({}, {
	title: {
		get: function() {
			return element( by.css( 'h2' )).getText();
		}
	},

	continueButton: {
		get: function() {
			return element( by.css( 'button' ));
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
	}
});


module.exports = DvaForm1Page;
