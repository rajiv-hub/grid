describe('Suite - Grid', function () {

		var suite = {};

		beforeEach(function() {
			module('accionLab');
	  });

		beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, _$window_) {
			suite.controller = _$controller_;
	    suite.rootScope = _$rootScope_;
			suite.scope = suite.rootScope.$new();
			suite.controller('gridCntrl', {
	        $scope: suite.scope
	    });
			suite.$httpBackend = _$httpBackend_;
			suite.$window = _$window_;
	  }));
		it('spec - set grid config values', inject(function() {
			expect(suite.scope.gridOptions).toEqual({
			    paginationPageSizes: [10, 20, 30, 40, 50],
			    paginationPageSize: 10,
			    columnDefs: [
			      { name: 'id' },
			      { name: 'userId' },
			      { name: 'title' },
			      { name: 'body' }
			    ],
			    rowHeight: 30,
			    headerRowHeight: 80,
			    enableHorizontalScrollbar:0,
				enableVerticalScrollbar:2
			});
    }));

		it('spec - Check grid function called', inject(function() {
			spyOn(suite.scope, 'getGridData').and.callThrough();
      suite.scope.getGridData();
	    expect(suite.scope.getGridData).toHaveBeenCalled();
    }));

		it('spec - Check grid with response', inject(function() {
			spyOn(suite.scope, 'getGridData').and.callThrough();
			var gridResponseData = [{"userId": 1,"id": 1,"title": "test","body": "test"}];
			suite.$httpBackend.expectGET('http://jsonplaceholder.typicode.com/posts').respond(200, gridResponseData);
			suite.scope.getGridData();
			suite.$httpBackend.flush();
			expect(suite.scope.gridOptions.data).toEqual(gridResponseData);
			expect(suite.scope.doneLoading).toBe(true);
		}));

		it('spec - Check grid for empty response', inject(function() {
			spyOn(suite.scope, 'getGridData').and.callThrough();
			var gridResponseData = undefined;
      suite.$httpBackend.expectGET('http://jsonplaceholder.typicode.com/posts').respond(200, gridResponseData);
      suite.scope.getGridData();
			suite.$httpBackend.flush();
	    expect(suite.scope.gridOptions.data).toEqual([]);
			expect(suite.scope.gridStatus).toBe("No data available");
			expect(suite.scope.doneLoading).toBe(true);
    }));

		it('spec - serverError', inject(function() {
			spyOn(suite.scope, 'getGridData').and.callThrough();
			var gridResponseData = 'not found';
			suite.$httpBackend.expectGET('http://jsonplaceholder.typicode.com/posts').respond(404 , gridResponseData);
			suite.scope.getGridData();
			suite.$httpBackend.flush();
			expect(suite.scope.status).toEqual('SERVER NOT RESPONDING');
			expect(suite.scope.serverError).toBe(true);
			expect(suite.scope.doneLoading).toBe(true);

		}));

});
