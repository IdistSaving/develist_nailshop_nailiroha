'use strict';

angular.module("nailShopApp")
	.directive("aboutLandingDir", function (Upload) {
		return {
			link: function (scope, element, attrs) {
				// ChangeImage Function Section
				scope.changeAboutImage = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.about_image = image_64;
					});
				};

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/about/aboutLandingDir.html'
		};
	});
