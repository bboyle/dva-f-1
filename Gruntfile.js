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
			test: [ 'test/*.js' ]
		},

		// e2e tests
		protractor: {
			options: {
				keepAlive: true,
				configFile: "protractor.conf.js"
			},
			auto: {
				keepAlive: true,
				options: {
					args: {
						seleniumPort: 4444
					}
				}
			}
		},
		watch: {
			test: {
				files: 'test/*.spec.js',
				tasks: [ 'eslint:test', 'protractor' ]
			},
			src: {
				files: 'src/js/*.js',
				tasks: [ 'eslint:src', 'protractor' ]
			},
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-eslint' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-protractor-runner' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Default task.
	grunt.registerTask( 'dev', [ 'connect', 'watch' ]);
	grunt.registerTask( 'default', [ 'connect', 'protractor', 'watch' ]);

};
