'use strict';

var DvaForm1Page = require( './dvaf1.page.js' );

var RelationshipView = function() {
	DvaForm1Page.call( this );
};


RelationshipView.prototype = Object.create( DvaForm1Page.prototype, {
	get: {
		value: function() {
			this.gotoRelationshipView();
		}
	}

});
RelationshipView.constructor = RelationshipView;


module.exports = RelationshipView;
