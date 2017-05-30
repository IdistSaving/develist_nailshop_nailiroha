'use strict';

angular.module("nailShopApp")
	.directive("listsPriceLandingDir", function (PriceR) {
		return {
			link: function (scope, element, attrs) {

				// Add Function Section
				scope.addMenu = function(){
					var price_new = {
						title:'',
						price:'',
						description:'',
						order:(scope.data&&angular.isArray(scope.data.prices)) ? (scope.data.prices.length+1) : 0
					};
					scope.data.prices.push(price_new);
				};

				// Watch Function Section
				// scope.$watch('nailShopPrice.length', function(){
				// 	if(scope.nailShopPrice.length>=1){
				// 		scope.nailShopPrice = _.sortBy(scope.nailShopPrice, ['order']);
				// 		for(var i=0; i<scope.nailShopPrice.length; i++){
				// 			scope.nailShopPrice[i].order = i+1;
				// 		}
				// 	}
				// 	else scope.addMenu();
				// });

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/price/listsPriceLandingDir.html'
		};
	});
