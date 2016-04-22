'use strict';


var DvaForm1Page = function( url ) {
	url = url || 'index.html';
	browser.get( '/src/' + url );
};


function filterIsDisplayed( element ) {
	return element.isDisplayed();
}


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

	visibleQuestions: {
		get: function() {
			return element.all( by.css( '.questions > li' )).filter( filterIsDisplayed );
		}
	},

	continue: {
		value: function() {
			this.continueButton.click();
		}
	},

	goto: {
		value: function( link ) {
			element( by.linkText( link )).click();
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
