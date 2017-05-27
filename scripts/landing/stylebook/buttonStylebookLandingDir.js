'use strict';

angular.module("nailShopApp")
	.directive("buttonStylebookLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:false,
			restrict:"EA",
			templateUrl: 'views/landing/stylebook/buttonStylebookLandingDir.html'
		};
	});
