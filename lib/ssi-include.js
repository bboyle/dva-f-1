exports.ssiInclude = function( connect, options, middlewares ) {
	options = options || {};
	options.index = options.index || 'index.html';
	middlewares.unshift(function globalIncludes( req, res, next ) {
		var fs = require('fs');
		var filename = require( 'url' ).parse( req.url ).pathname;
		if ( /\/$/.test( filename )) {
			filename += options.index;
		}

		if ( /\.html$/.test( filename )) {
			fs.readFile( options.base + filename, 'utf-8', function( err, data ) {
				if ( err ) {
					next( err );
				} else {
					res.writeHead( 200, { 'Content-Type': 'text/html' });
					data = data.split( '<!--#include virtual="' );
					res.write( data.shift(), 'utf-8' );
					data.forEach(function( chunk ) {
						var path = chunk.substring( 0, chunk.indexOf( '"-->' ));
						// local includes
						path = options.base + require( 'url' ).parse( req.url ).pathname.replace( /[^\/]+$/, '' ) + path;
						res.write( fs.readFileSync( path, 'utf-8' ), 'utf-8' );
						res.write( chunk.substring( chunk.indexOf( '-->' ) + 3 ), 'utf-8' );
					});
					res.end();
				}
			});

		} else {
			next();
		}
	});
	return middlewares;
};
