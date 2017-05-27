'use strict';

angular.module("nailShopApp")
	.directive("infoContactLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/contact/infoContactLandingDir.html'
		};
	});
