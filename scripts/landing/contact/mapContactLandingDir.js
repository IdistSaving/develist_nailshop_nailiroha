'use strict';

angular.module("nailShopApp")
	.directive("mapContactLandingDir", function ($q) {
		return {
			link: function (scope, element, attrs) {

				// Map Section
				scope.getAddress = function(){
					return $q(function(resolve, reject){
						naver.maps.Service.geocode({
							address: scope.data.location
						}, function(status, response) {
							if (status === naver.maps.Service.Status.ERROR) {
								return alert('주소가 정확하지 않습니다.');
							}
							var item = response.result.items[0];
	            var addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]';
							var point = new naver.maps.Point(item.point.x, item.point.y);
							resolve({Lat:item.point.y, Lng:item.point.x});
						});
					})

				};

        // Initialize Function Section
        scope.initialize = function(){
					scope.getAddress().then(function(currentLatLng){
						var position = new naver.maps.LatLng(currentLatLng.Lat, currentLatLng.Lng);
						var mapDiv = document.getElementById('map');
						var map = new naver.maps.Map(mapDiv, {
							center: position,
							zoom: 14
						});
						var HOME_PATH = window.HOME_PATH || '.';
						var markerOptions = {
					    position: new naver.maps.LatLng(currentLatLng.Lat, currentLatLng.Lng),
					    map: map
							,
					    icon: {
				        url: 'https://navermaps.github.io/maps.js/docs/img/example/sally.png',
				        size: new naver.maps.Size(50, 52),
				        origin: new naver.maps.Point(0, 0),
				        anchor: new naver.maps.Point(25, 26)
					    }
						};
						var marker = new naver.maps.Marker(markerOptions);
					});

        };
        scope.initialize();
			},
			replace: true,
			scope:{
				data:"=data",
				nailShop:"=nailShop"
			},
			restrict:"EA",
			templateUrl: 'views/landing/contact/mapContactLandingDir.html'

		};
	});
