'use strict';

angular.module("nailShopApp")
	.directive("footerDir", function ($rootScope, SiteR, PriceR, $q) {
		return {
			link: function (scope, element, attrs) {

				// Cancel Function Section
				scope.cancelSite = function(){
					(confirm('정말 취소하시겠습니까?'))
					$rootScope.stateS.go('landing', null, null);
				};

				// Cancel Function Section
				scope.logoOutButton = function(){
					(confirm('로그아웃 하시나요?'))
					scope.signOut();
				};

				// Function Section
				scope.saveButton = function(){
					// $rootScope.$broadcast('save-button', true);
					scope.updateData();
				};

				// ChangeImage Function Section
				scope.changeImage = function(image){
					if(!image) return;
					Upload.base64DataUrl(image).then(function(image_64){
						scope.data_update.cover_image = image_64;
					});
				};

			},
			replace: true,
			scope:false,
			restrict:"EA",
			templateUrl: 'views/directive/footerDir.html'
		};
	});
