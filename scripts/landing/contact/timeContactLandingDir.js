'use strict';

angular.module("nailShopApp")
	.directive("timeContactLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/contact/timeContactLandingDir.html'
		};
	});
