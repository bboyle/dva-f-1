/* global Handlebars, dvaf1Data */
$(function() {
	'use strict';


	function TitleCase( word ) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}


	function theAggrieved() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'you';
		}
		if ( dvaf1Data.userRelationship && dvaf1Data.userRelationship !== 'someone') {
			return 'your ' + dvaf1Data.userRelationship;
		}

		return 'the aggrieved';
	}
	function theRespondent() {
		return 'the respondent';
	}
	function TheAggrieved() {
		return TitleCase( theAggrieved() );
	}


	function doesTheAggrieved() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'do you';
		}
		if ( dvaf1Data.aggrievedNameGiven ) {
			return 'does ' + dvaf1Data.aggrievedNameGiven;
		}
		if ( dvaf1Data.userRelationship ) {
			return dvaf1Data.userRelationship === 'someone' ? 'do they' : 'does your ' + dvaf1Data.userRelationship;
		}

		return 'does the aggrieved';
	}
	function DoesTheAggrieved() {
		return TitleCase( doesTheAggrieved() );
	}


	function genderPronoun( gender, feminine, masculine, generic ) {
		return dvaf1Data.FEMININE_GENDER.test( gender ) ? feminine : dvaf1Data.MASCULINE_GENDER.test( gender ) ? masculine : generic;
	}


	Handlebars.registerHelper( 'theAggrieved', theAggrieved );
	Handlebars.registerHelper( 'TheAggrieved', TheAggrieved );
	Handlebars.registerHelper( 'theRespondent', theRespondent );

	Handlebars.registerHelper( 'doesTheAggrieved', doesTheAggrieved );
	Handlebars.registerHelper( 'DoesTheAggrieved', DoesTheAggrieved );


	Handlebars.registerHelper( 'TheAggrievedIs', function() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'You are';
		}
		if ( dvaf1Data.userRelationship ) {
			return dvaf1Data.userRelationship === 'someone' ? 'They are' : 'Your ' + dvaf1Data.userRelationship + ' is';
		}

		return 'The aggrieved is';
	});


	Handlebars.registerHelper( 'aggrievedTheir', function() {
		return dvaf1Data.userIsAggrieved ? 'your' : genderPronoun( dvaf1Data.aggrievedGender, 'her', 'his', 'their' );
	});


	Handlebars.registerHelper( 'respondentTheyKnow', function() {
		return 'they know';
	});
});
