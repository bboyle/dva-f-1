 /* global browser */
'use strict';

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	framework: 'jasmine',

	multiCapabilities: [{
		'browserName': 'chrome'
	}, {
		'browserName': 'firefox'
	}, {
		'browserName': 'internet explorer'
	}],

	suites: {
		e2e: ['test/spec/*.spec.js']
	},

	baseUrl: 'http://localhost:8000',

	onPrepare: function() {
		browser.ignoreSynchronization = true;
	}
};

// http://dev.topheman.com/setup-travis-ci-saucelabs-for-protractor/
if (process.env.TRAVIS) {
	delete exports.config.seleniumAddress;
	exports.config.multiCapabilities = [{
		browserName: 'chrome',
		build: process.env.TRAVIS_BUILD_NUMBER,
		'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
		name: 'DVAF1 e2e Chrome'
	}, {
		browserName: 'firefox',
		build: process.env.TRAVIS_BUILD_NUMBER,
		'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
		name: 'DVAF1 e2e Firefox'
	}, {
		browserName: 'internet explorer',
		build: process.env.TRAVIS_BUILD_NUMBER,
		'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
		name: 'DVAF1 e2e IE'
	}];
}
