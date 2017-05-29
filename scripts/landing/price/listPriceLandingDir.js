'use strict';

angular.module("nailShopApp")
	.directive("listPriceLandingDir", function () {
		return {
			link: function (scope, element, attrs) {

				// Delete Function Section
				scope.removeMenu = function(price){
					if(price&&scope.data&&scope.data.prices) price.show = false;
				};

			},
			replace: true,
			scope:{
				data:"=data",
				price:"=price"
			},
			restrict:"EA",
			templateUrl: 'views/landing/price/listPriceLandingDir.html'
		};
	});
