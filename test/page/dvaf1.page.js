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
			return element.all( by.css( 'form' )).get( 0 );
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

	gotoDownloadView: {
		value: function() {
			this.goto( 'Download your application' );
		}
	},

	// convenience: toggle user is aggrieved
	radioUserIsAggrieved: {
		get: function() {
			return element( by.id( 'user-is-aggrieved-Yes' ));
		}
	},

	radioUserIsNotAggrieved: {
		get: function() {
			return element( by.id( 'user-is-aggrieved-No' ));
		}
	},

	select: {
		value: function( name, value ) {
			element( by.name( name )).element( by.css( 'option[value="' + value + '"]' )).click();
		}
	},

	choose: {
		value: function( name, value ) {
			element( by.css( '[name="' + name + '"][value="' + value + '"]' )).click();
		}
	},

	value: {
		value: function( name ) {
			return element( by.name( name )).getAttribute( 'value' );
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

	fill: {
		value: function( data ) {
			var page = this;
			Object.keys( data ).forEach(function( key ) {
				page.answer( key, data[ key ]);
			});
		}
	},

	setAggrieved: {
		value: function( data ) {
			this.gotoAggrievedBasicView();
			this.fill( data );
		}
	},

	setRespondent: {
		value: function( data ) {
			this.gotoRespondentBasicView();
			this.fill( data );
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
