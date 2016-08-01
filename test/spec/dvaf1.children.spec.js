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

	it( 'should allow a child to be added', function() {
		expect( childrenView.repeatField( '.dvaf1-children' ).count() ).toEqual( 0 );
		childrenView.radioNameChildren.click();
		expect( childrenView.repeatField( '.dvaf1-children' ).count() ).toEqual( 1 );
	});

	it( 'should allow children to be added and removed', function() {
		childrenView.radioNameChildren.click();
		childrenView.addRepeat( '.dvaf1-children', 1 ).click();
		expect( childrenView.repeatField( '.dvaf1-children' ).count() ).toEqual( 2 );
		childrenView.addRepeat( '.dvaf1-children', 1 ).click();
		expect( childrenView.repeatField( '.dvaf1-children' ).count() ).toEqual( 3 );
		childrenView.delRepeat( '.dvaf1-children', 1 ).click();
		expect( childrenView.repeatField( '.dvaf1-children' ).count() ).toEqual( 2 );
	});

	it( 'should remember child data when navigating between pages', function() {
		childrenView.radioNameChildren.click();
		childrenView.answer( 'child0.name', 'James Smith' );
		childrenView.choose( 'child0.livesWith', 'applicant' );

		childrenView.addRepeat( '.dvaf1-children', 1 ).click();
		childrenView.answer( 'child1.name', 'Jessie Smith' );
		childrenView.choose( 'child0.livesWith', 'aggrieved' );

		childrenView.gotoCourtView();
		childrenView.gotoChildrenView();

		expect( element( by.name( 'child0.name' )).getAttribute( 'value' )).toBe( 'James Smith' );
		expect( element.all( by.css( '[name="child0.livesWith"][value="applicant"]' )).count()).toBe( 1 );
		// TODO fix test
		// expect( element( by.css( '[name="child0.livesWith"][value="applicant"]' )).getAttribute( 'checked' )).toBeTruthy();
		expect( element( by.name( 'child1.name' )).getAttribute( 'value' )).toBe( 'Jessie Smith' );
		// TODO fix test
		// expect( element( by.css( '[name="child1.livesWith"][value="aggrieved"]' )).getAttribute( 'checked' )).toBeTruthy();
	});

});
