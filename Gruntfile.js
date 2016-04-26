'use strict';

module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
			' Licensed <%= pkg.license %> */\n',
		// Task configuration.

		// build
		uglify: {
			options: {
				banner: '<%= banner %>',
				compress: {
					dead_code: true
				}
			},
			dev: {
				options: {
					beautify: true,
					mangle: false,
					preserveComments: true
				},
				files: {
					'dist/dvaf1.js': [
						'src/js/dvaf1-data.js',
						'src/js/dvaf1-lib.js',
						'src/js/dvaf1-flow.js'
					]
				}
			},
			production: {
				options: {
					preserveComments: /(?:^!|@(?:license|preserve|cc_on))/
				},
				files: {
					'dist/dvaf1.min.js': [
						'src/js/dvaf1-data.js',
						'src/js/dvaf1-lib.js',
						'src/js/dvaf1-flow.js'
					]
				}
			}
		},

		copy: {
			qgov: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: 'view/**',
					dest: 'dist/qgov/',
					filter: 'isFile'
				}]
			}
		},

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
				configFile: 'protractor.conf.js'
			},
			watch: {
				options: {
					configFile: 'protractor-watch.conf.js'
				}
			},
			acceptance: {},
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
					'test/spec/*.spec.js',
					'test/page/*.page.js',
					'test/page/*.view.js'
				],
				tasks: [ 'eslint:test', 'protractor:watch' ]
			},
			src: {
				files: 'src/js/*.js',
				tasks: [ 'eslint:src', 'uglify', 'protractor:watch' ]
			},
			html: {
				files: 'src/**/*.html',
				tasks: [ 'copy', 'protractor:watch' ]
			},
			build: {
				files: '<%= eslint.build %>',
				tasks: [ 'eslint:build' ]
			}
		},


		// env
		shell: {
			protractor: {
				options: { stdout: true },
				command: 'node ' + require( 'path' ).resolve( 'node_modules/protractor/bin/webdriver-manager' ) + ' update --standalone --chrome --firefox --ie32'
			}
		},

		protractor_webdriver: {
			alive: {
				options: {
					keepAlive: true
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-eslint' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-shell' );
	grunt.loadNpmTasks( 'grunt-protractor-webdriver' );
	grunt.loadNpmTasks( 'grunt-protractor-runner' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// task aliases
	grunt.registerTask( 'build', [ 'eslint:build', 'uglify', 'copy' ]);
	grunt.registerTask( 'dev', [ 'build', 'shell:protractor', 'protractor_webdriver:alive', 'connect', 'watch' ]);
	grunt.registerTask( 'test-e2e', [ 'shell:protractor', 'protractor_webdriver:alive', 'connect', 'protractor:acceptance' ]);
	grunt.registerTask( 'test', [ 'shell:protractor', 'eslint', 'uglify', 'test-e2e' ]);
	grunt.registerTask( 'travis', [ 'build', 'eslint', 'connect', 'protractor:saucelabs' ]);
	grunt.registerTask( 'default', [ 'dev' ]);

};
