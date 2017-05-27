'use strict';

angular.module("nailShopApp")
	.directive("titleLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:{
				title: "=text"
			},
			restrict:"EA",
			templateUrl: 'views/landing/directive/titleLandingDir.html'
		};
	});
