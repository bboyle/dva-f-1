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

	function aggrievedName( define ) {
		return dvaf1Data.aggrievedNameGiven ? dvaf1Data.aggrievedNameGiven + ( define === true ? ' (the aggrieved)' : '' ) : 'the aggrieved';
	}
	function AggrievedName( define ) {
		return dvaf1Data.aggrievedNameGiven ? dvaf1Data.aggrievedNameGiven + ( define === true ? ' (the aggrieved)' : '' ) : 'The aggrieved';
	}

	function respondentName( define ) {
		return dvaf1Data.respondentNameGiven ? dvaf1Data.respondentNameGiven + ( define === true ? ' (the respondent)' : '' ) : 'the respondent';
	}
	function RespondentName( define ) {
		return dvaf1Data.respondentNameGiven ? dvaf1Data.respondentNameGiven + ( define === true ? ' (the respondent)' : '' ) : 'The respondent';
	}

	function theAggrieveds() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'your';
		}
		return aggrievedName() + '’s';
	}
	function TheAggrieveds() {
		return TitleCase( theAggrieveds() );
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

	function doesTheRespondent() {
		if ( dvaf1Data.respondentNameGiven ) {
			return 'does ' + dvaf1Data.respondentNameGiven;
		}
		return 'does the respondent';
	}
	function DoesTheRespondent() {
		return TitleCase( doesTheRespondent() );
	}

	function isTheAggrieved() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'are you';
		}
		if ( dvaf1Data.aggrievedNameGiven ) {
			return 'is ' + dvaf1Data.aggrievedNameGiven;
		}
		if ( dvaf1Data.userRelationship ) {
			return dvaf1Data.userRelationship === 'someone' ? 'are they' : 'is your ' + dvaf1Data.userRelationship;
		}

		return 'is the aggrieved';
	}
	function IsTheAggrieved() {
		return TitleCase( isTheAggrieved() );
	}

	function isTheRespondent() {
		if ( dvaf1Data.respondentNameGiven ) {
			return 'is ' + dvaf1Data.respondentNameGiven;
		}

		return 'is the respondent';
	}
	function IsTheRespondent() {
		return TitleCase( isTheRespondent() );
	}


	function genderPronoun( gender, feminine, masculine, generic ) {
		return dvaf1Data.FEMININE_GENDER.test( gender ) ? feminine : dvaf1Data.MASCULINE_GENDER.test( gender ) ? masculine : generic;
	}


	function aggrievedILive() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'I live';
		}
		var she = genderPronoun( dvaf1Data.aggrievedGender, 'she', 'he', 'they' );
		return she === 'they' ? 'they live' : she + ' lives';
	}
	function aggrievedYouPlurals(singular, plural) {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'you ' + singular;
		}
		var she = genderPronoun( dvaf1Data.aggrievedGender, 'she', 'he', 'they' );
		return she === 'they' ? 'they ' + singular : she + ' ' + plural;
	}
	function aggrievedYouLive() {
		return aggrievedYouPlurals( 'live', 'lives' );
	}
	function aggrievedYouKnow() {
		return aggrievedYouPlurals( 'know', 'knows' );
	}
	function aggrievedYouHave() {
		return aggrievedYouPlurals( 'have', 'has' );
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
	function aggrievedYouNeed() {
		return aggrievedYouPlurals( 'need', 'needs' );
	}

	function respondentTheyReceive() {
		var she = genderPronoun( dvaf1Data.respondentGender, 'she', 'he', 'they' );
		return she === 'they' ? 'they receive' : she + ' receives';
	}

	function theAggrievedWants() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'You want';
		} else if ( dvaf1Data.aggrievedNameGiven ) {
			return dvaf1Data.aggrievedNameGiven + ' wants';
		}

		return 'The aggrieved wants';
	}
	function TheAggrievedWants() {
		return TitleCase( theAggrievedWants() );
	}

	function aggrievedMe() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'me';
		}
		return genderPronoun( dvaf1Data.aggrievedGender, 'her', 'him', 'them' );
	}
	function aggrievedMy() {
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
	function aggrievedYou( define ) {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return aggrievedName() + ( define === true ? ' (the aggrieved)' : '' );
		}
		return 'you' + ( define === true ? ' (the aggrieved)' : '' );
	}
	function aggrievedYouThem() {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return genderPronoun( dvaf1Data.aggrievedGender, 'her', 'him', 'them' );
		}
		return 'you';
	}
	function aggrievedYouAre() {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return aggrievedName() + ' is';
		}
		return 'you are';
	}
	function aggrievedYour() {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return genderPronoun( dvaf1Data.aggrievedGender, 'her', 'his', aggrievedName() );
		}
		return 'your';
	}

	function we() {
		if ( dvaf1Data.userIsAggrieved === false ) {
			return aggrievedName() + ' and ' + respondentName();
		}
		return 'we';
	}
	function We() {
		return TitleCase( we() );
	}

	Handlebars.registerHelper( 'theAggrieved', theAggrieved );
	Handlebars.registerHelper( 'TheAggrieved', TheAggrieved );
	Handlebars.registerHelper( 'aggrievedName', aggrievedName );
	Handlebars.registerHelper( 'AggrievedName', AggrievedName );
	Handlebars.registerHelper( 'theAggrieveds', theAggrieveds );
	Handlebars.registerHelper( 'TheAggrieveds', TheAggrieveds );
	Handlebars.registerHelper( 'aggrievedYou', aggrievedYou );
	Handlebars.registerHelper( 'aggrievedYouThem', aggrievedYouThem );
	Handlebars.registerHelper( 'aggrievedYouAre', aggrievedYouAre );
	Handlebars.registerHelper( 'aggrievedYour', aggrievedYour );

	Handlebars.registerHelper( 'we', we );
	Handlebars.registerHelper( 'We', We );

	Handlebars.registerHelper( 'theRespondent', theRespondent );
	Handlebars.registerHelper( 'RespondentName', RespondentName );
	Handlebars.registerHelper( 'respondentName', respondentName );
	Handlebars.registerHelper( 'respondentTheyReceive', respondentTheyReceive );
	Handlebars.registerHelper( 'doesTheRespondent', doesTheRespondent );
	Handlebars.registerHelper( 'DoesTheRespondent', DoesTheRespondent );
	Handlebars.registerHelper( 'IsTheRespondent', IsTheRespondent );

	Handlebars.registerHelper( 'doesTheAggrieved', doesTheAggrieved );
	Handlebars.registerHelper( 'DoesTheAggrieved', DoesTheAggrieved );
	Handlebars.registerHelper( 'isTheAggrieved', isTheAggrieved );
	Handlebars.registerHelper( 'IsTheAggrieved', IsTheAggrieved );

	Handlebars.registerHelper( 'aggrievedILive', aggrievedILive );
	Handlebars.registerHelper( 'aggrievedYouHave', aggrievedYouHave );
	Handlebars.registerHelper( 'aggrievedYouLive', aggrievedYouLive );
	Handlebars.registerHelper( 'aggrievedYouKnow', aggrievedYouKnow );
	Handlebars.registerHelper( 'aggrievedYouPlurals', aggrievedYouPlurals );
	Handlebars.registerHelper( 'aggrievedYouNeed', aggrievedYouNeed );
	Handlebars.registerHelper( 'TheAggrievedINeed', TheAggrievedINeed );
	Handlebars.registerHelper( 'TheAggrievedWants', TheAggrievedWants );
	Handlebars.registerHelper( 'theAggrievedWants', theAggrievedWants );
	Handlebars.registerHelper( 'aggrievedMe', aggrievedMe );
	Handlebars.registerHelper( 'aggrievedMy', aggrievedMy );
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

	Handlebars.registerHelper( 'TheApplicantIs', function() {
		if ( dvaf1Data.applicationLodgedBy === 'user' ) {
			return 'I am';
		}

		return 'The applicant is';
	});


	Handlebars.registerHelper( 'aggrievedTheir', function() {
		return dvaf1Data.userIsAggrieved ? 'your' : genderPronoun( dvaf1Data.aggrievedGender, 'her', 'his', 'their' );
	});
	Handlebars.registerHelper( 'aggrievedThey', function() {
		return dvaf1Data.userIsAggrieved ? 'your' : genderPronoun( dvaf1Data.aggrievedGender, 'she', 'he', 'they' );
	});
	Handlebars.registerHelper( 'aggrievedThem', function() {
		return dvaf1Data.userIsAggrieved ? 'your' : genderPronoun( dvaf1Data.aggrievedGender, 'her', 'him', 'them' );
	});


	function respondentThey() {
		return genderPronoun( dvaf1Data.respondentGender, 'she', 'he', 'they' );
	}
	function RespondentThey() {
		return TitleCase( respondentThey() );
	}

	Handlebars.registerHelper( 'respondentTheir', function() {
		return genderPronoun( dvaf1Data.respondentGender, 'her', 'his', 'their' );
	});

	Handlebars.registerHelper( 'respondentThey', respondentThey );
	Handlebars.registerHelper( 'RespondentThey', RespondentThey );
	Handlebars.registerHelper( 'respondentThem', function() {
		return genderPronoun( dvaf1Data.respondentGender, 'her', 'him', 'them' );
	});

	Handlebars.registerHelper( 'respondentTheyKnow', function() {
		return 'they know';
	});

	Handlebars.registerHelper( 'plus1', function( n ) {
		return parseFloat( n ) + 1;
	});

	Handlebars.registerHelper( 'theChildren', function() {
		return 'the ' + ( dvaf1Data.child.length === 1 ? 'child' : 'children' );
	});

	Handlebars.registerHelper( 'theAggrievedsKids', function() {
		return theAggrieveds() + ' ' + dvaf1Data.child.length === 1 ? 'kid' : 'kids';
	});

	Handlebars.registerHelper( 'theAssociatesNeed', function() {
		return 'the ' + dvaf1Data.associate.length === 1 ? 'associate needs' : 'associates need';
	});
});
