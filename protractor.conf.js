exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',

	suites: {
		e2e: ['test/*.spec.js']
	}
};

// http://dev.topheman.com/setup-travis-ci-saucelabs-for-protractor/
if (process.env.TRAVIS) {
	exports.config.sauceUser = process.env.SAUCE_USERNAME;
	exports.config.sauceKey = process.env.SAUCE_ACCESS_KEY;
	exports.config.capabilities = {
		browserName: 'chrome',
		build: process.env.TRAVIS_BUILD_NUMBER,
		'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
	};
}
