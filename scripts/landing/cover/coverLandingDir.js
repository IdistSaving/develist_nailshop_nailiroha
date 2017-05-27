'use strict';

angular.module("nailShopApp")
	.directive("coverLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/cover/coverLandingDir.html'
		};
	});
