'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var DownloadView = function() {
	DvaForm1Page.call( this );
};


DownloadView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			this.gotoDownloadView();
		}
	}
});
DownloadView.constructor = DownloadView;


module.exports = DownloadView;
