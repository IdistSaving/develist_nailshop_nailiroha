'use strict';

angular.module("nailShopApp")
	.directive("priceLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:{
				data:"=data"
			},
			restrict:"EA",
			templateUrl: 'views/landing/price/priceLandingDir.html'
		};
	});
