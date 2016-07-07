'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var ChildrenView = function() {
	DvaForm1Page.call( this );
};


ChildrenView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			this.gotoChildrenView();
		}
	}
});
ChildrenView.constructor = ChildrenView;


module.exports = ChildrenView;
