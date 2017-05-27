'use strict';

angular.module("nailShopApp")
	.directive("imageStylebookLandingDir", function (Upload) {
		return {
			link: function (scope, element, attrs) {
				// ChangeImage Function Section

				// Image 1
				scope.changeStyleImage1 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image1 = image_64;
					});
				};
				// Image 2
				scope.changeStyleImage2 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image2 = image_64;
					});
				};
				// Image 3
				scope.changeStyleImage3 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image3 = image_64;
					});
				};
				// Image 4
				scope.changeStyleImage4 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image4 = image_64;
					});
				};
				// Image 5
				scope.changeStyleImage5 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image5 = image_64;
					});
				};
				// Image 6
				scope.changeStyleImage6 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image6 = image_64;
					});
				};
				// Image 7
				scope.changeStyleImage7 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image7 = image_64;
					});
				};
				// Image 8
				scope.changeStyleImage8 = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data.style_image8 = image_64;
					});
				};

			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/stylebook/imageStylebookLandingDir.html'
		};
	});
