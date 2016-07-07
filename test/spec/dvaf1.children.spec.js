'use strict';


var ChildrenView = require( '../page/dvaf1.children.view.js' );
var childrenView;


describe( 'children view', function() {
	beforeEach(function() {
		childrenView = new ChildrenView();
		childrenView.get();
	});

	it( 'should have a title', function() {
		expect( childrenView.title ).toEqual( 'Are there children who live or spend time with you (the aggrieved) who need protection?' );
	});

});
