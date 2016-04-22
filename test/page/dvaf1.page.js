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

	answer: {
		value: function( name, value ) {
			var input = element( by.name( name ));

			input.clear().sendKeys( value );
			input.sendKeys( protractor.Key.TAB );
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

	gotoSituationView: {
		value: function() {
			this.goto( 'Your situation' );
		}
	},

	gotoAggrievedBasicView: {
		value: function() {
			this.goto( 'Who needs protection?' );
		}
	},

	gotoRespondentBasicView: {
		value: function() {
			this.goto( 'Who do they need protection from?' );
		}
	},

	// convenience: toggle user is aggrieved
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
			this.gotoSituationView();
			this.radioUserIsAggrieved.click();
		}
	},

	chooseUserIsNotAggrieved: {
		value: function() {
			this.gotoSituationView();
			this.radioUserIsNotAggrieved.click();
		}
	},

	chooseAggrievedIsUsers: {
		value: function( relationship ) {
			this.gotoSituationView();
			this.chooseUserIsNotAggrieved();
			element( by.name( 'userRelationship' )).element( by.css( 'option[value = "' + relationship + '"]' )).click();
		}
	},

	setAggrieved: {
		value: function( aggrievedData ) {
			this.gotoAggrievedBasicView();
			var page = this;
			Object.keys( aggrievedData ).forEach(function( key ) {
				page.answer( key, aggrievedData[ key ]);
			});
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
