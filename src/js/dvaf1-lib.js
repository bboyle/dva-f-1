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


	function TheAggrievedINeed() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'I need';
		}
		if ( dvaf1Data.userRelationship && dvaf1Data.userRelationship !== 'someone') {
			return 'My ' + dvaf1Data.userRelationship + ' needs';
		}

		return 'The aggrieved needs';
	}

	function theAggrievedMy() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'my';
		}
		return genderPronoun( dvaf1Data.aggrievedGender, 'her', 'his', 'their' );
	}
	function theAggrievedThey() {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return dvaf1Data.aggrievedNameGiven;
		}
		return 'you';
	}
	function aggrievedYou() {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return dvaf1Data.aggrievedNameGiven;
		}
		return 'you';
	}
	function aggrievedYour() {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return dvaf1Data.aggrievedNameGiven;
		}
		return 'your';
	}


	function respondentName( define ) {
		return dvaf1Data.respondentNameGiven ? dvaf1Data.respondentNameGiven + ( define === true ? ' (the respondent)' : '' ) : 'the respondent';
	}
	function RespondentName( define ) {
		return dvaf1Data.respondentNameGiven ? dvaf1Data.respondentNameGiven + ( define === true ? ' (the respondent)' : '' ) : 'The respondent';
	}

	Handlebars.registerHelper( 'theAggrieved', theAggrieved );
	Handlebars.registerHelper( 'TheAggrieved', TheAggrieved );
	Handlebars.registerHelper( 'aggrievedYou', aggrievedYou );
	Handlebars.registerHelper( 'aggrievedYour', aggrievedYour );

	Handlebars.registerHelper( 'theRespondent', theRespondent );
	Handlebars.registerHelper( 'RespondentName', RespondentName );
	Handlebars.registerHelper( 'respondentName', respondentName );

	Handlebars.registerHelper( 'doesTheAggrieved', doesTheAggrieved );
	Handlebars.registerHelper( 'DoesTheAggrieved', DoesTheAggrieved );

	Handlebars.registerHelper( 'TheAggrievedINeed', TheAggrievedINeed );
	Handlebars.registerHelper( 'theAggrievedMy', theAggrievedMy );
	Handlebars.registerHelper( 'theAggrievedThey', theAggrievedThey );


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
