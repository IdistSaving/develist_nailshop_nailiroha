'use strict';

angular.module("nailShopApp")
	.directive("headerDir", function ($rootScope) {
		return {
			link: function (scope, element, attrs) {

					scope.contents=[
						{title:"ABOUT"},
						{title:"STYLEBOOK"},
						{title:"PRICE"},
						{title:"RESERVATION"},
						{title:"CONTACT"}
					];

					scope.header_menu_click=false;
					scope.closePop = function(){
						scope.header_menu_click = false;
					};
			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/directive/headerDir.html'
		};
	});
