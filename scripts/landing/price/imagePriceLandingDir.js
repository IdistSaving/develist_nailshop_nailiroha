'use strict';

angular.module("nailShopApp")
	.directive("imagePriceLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:false,
			restrict:"EA",
			templateUrl: 'views/landing/price/imagePriceLandingDir.html'
		};
	});
