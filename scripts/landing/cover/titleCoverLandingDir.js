'use strict';

angular.module("nailShopApp")
	.directive("titleCoverLandingDir", function (Upload) {
		return {
			link: function (scope, element, attrs) {
			// ChangeImage Function Section
			scope.changeTitleImage = function(image){
				if(!image) return;
				Upload.base64DataUrl(image).then(function(image_64){
					scope.data.cover_logo = image_64;
				});
			};
			console.log('titleCoverLandingDir');

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/cover/titleCoverLandingDir.html'
		};
	});
