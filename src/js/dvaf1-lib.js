/* global Handlebars, dvaf1Data */
$(function() {
	'use strict';


	Handlebars.registerHelper( 'doesTheAggrieved', function() {
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
	});


	Handlebars.registerHelper( 'TheAggrievedIs', function() {
		if ( dvaf1Data.userIsAggrieved ) {
			return 'You are';
		}
		if ( dvaf1Data.userRelationship ) {
			return dvaf1Data.userRelationship === 'someone' ? 'They are' : 'Your ' + dvaf1Data.userRelationship + ' is';
		}

		return 'The aggrieved is';
	});

});
