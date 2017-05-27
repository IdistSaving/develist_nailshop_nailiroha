'use strict';

angular.module("nailShopApp")
	.directive("contactLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/contact/contactLandingDir.html'
		};
	});
