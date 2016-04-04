exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',

	suites: {
		e2e: ['test/*.spec.js']
	}
};