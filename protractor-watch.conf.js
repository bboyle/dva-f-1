 /* global browser */
'use strict';

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	framework: 'jasmine',

	suites: {
		e2e: ['test/spec/*.spec.js']
	},

	baseUrl: 'http://localhost:8000',

	onPrepare: function() {
		browser.ignoreSynchronization = true;
	}
};
