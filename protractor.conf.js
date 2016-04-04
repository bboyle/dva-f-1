'use strict';

exports.config = {
	framework: 'jasmine',

	suites: {
		e2e: ['test/*.spec.js']
	}
};

// http://dev.topheman.com/setup-travis-ci-saucelabs-for-protractor/
if (process.env.TRAVIS) {
	exports.config.capabilities = {
		browserName: 'chrome',
		build: process.env.TRAVIS_BUILD_NUMBER,
		'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
		name: 'DVAF1 e2e'
	};
}
