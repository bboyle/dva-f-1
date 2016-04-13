'use strict';

module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.

		// local server
		connect: {
			dev: {
				options: {
					port: 8000,
					base: '.',
					middleware: require( './lib/ssi-include' ).ssiInclude
				}
			}
		},

		// lint
		eslint: {
			src: [ 'src/js/*.js' ],
			test: [ 'test/**/*.js' ],
			build: [ '*.js', 'lib/*.js' ]
		},

		// e2e tests
		protractor: {
			options: {
				keepAlive: true,
				configFile: 'protractor.conf.js'
			},
			localhost: {
				keepAlive: true,
				options: {
					args: {
						seleniumPort: 4444
					}
				}
			},
			saucelabs: {
				options: {
					args: {
						sauceUser: process.env.SAUCE_USERNAME,
						sauceKey: process.env.SAUCE_ACCESS_KEY
					}
				}
			}
		},
		watch: {
			test: {
				files: [
					'test/*.spec.js',
					'test/page/*.js'
				],
				tasks: [ 'eslint:test', 'protractor:localhost' ]
			},
			src: {
				files: 'src/js/*.js',
				tasks: [ 'eslint:src', 'protractor:localhost' ]
			},
			html: {
				files: 'src/**/*.html',
				tasks: [ 'protractor:localhost' ]
			},
			build: {
				files: '<%= eslint.build %>',
				tasks: [ 'eslint:build' ]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-eslint' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-protractor-runner' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Default task.
	grunt.registerTask( 'build', [ 'eslint:build' ]);
	grunt.registerTask( 'test-e2e', [ 'connect', 'protractor:localhost' ]);
	grunt.registerTask( 'travis', [ 'build', 'eslint', 'connect', 'protractor:saucelabs' ]);
	grunt.registerTask( 'dev', [ 'build', 'connect', 'watch' ]);
	grunt.registerTask( 'test', [ 'eslint', 'test-e2e' ]);
	grunt.registerTask( 'default', [ 'connect', 'protractor:localhost', 'watch' ]);

};
