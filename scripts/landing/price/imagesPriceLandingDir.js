'use strict';

angular.module("nailShopApp")
	.directive("imagesPriceLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:false,
			restrict:"EA",
			templateUrl: 'views/landing/price/imagesPriceLandingDir.html'
		};
	});
