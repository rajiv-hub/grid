var app = angular.module('accionLab', ['ui.grid', 'ui.grid.pagination', 'ui.grid.autoResize'])
.controller('gridCntrl', function($scope,$http) {

	angular.element(document).ready(function () {
	    $('#exampleModalLong').modal('show');
	    $scope.doneLoading = false;
	    $scope.status = 'Loading Grid...';
	    $scope.getGridData();
	});

	$scope.gridOptions = {
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
	};

	$scope.getGridData = function(){
		$http({
			method : "GET",
			url : "https://jsonplaceholder.typicode.com/posts"
		})
		.then(function mySuccess(response) {
				$scope.serverError = false;
				if(response.data !== undefined && response.data !== null){
					$scope.doneLoading = true;
					$scope.gridOptions.data = response.data;
				}else{
					$scope.doneLoading = true;
					$scope.gridOptions.data = [];
					$scope.gridStatus = 'No data available'
				}
			}, function myError(response) {
				$scope.doneLoading = true;
				$scope.serverError = true;
				$scope.status = 'SERVER NOT RESPONDING'
			}
		);
	};

})
