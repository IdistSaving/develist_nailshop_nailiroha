'use strict';

angular.module('nailShopApp')
  .controller('LandingCtrl', function ($rootScope, $scope, $q, SiteR, PriceR, EventR) {

    // Check Function Seciton
    $scope.checkAdmin = function(){
      if(!($rootScope.user&&$rootScope.user.develist_user_profile
        &&$rootScope.site&&$rootScope.site.user_profile
        &&($rootScope.site.user_profile == $rootScope.user.develist_user_profile))){
        return false;
      } else { return true; }
    };

    // Load Function Section
    $scope.loadData = function(){
  		return $q(function(resolve, reject) {
  			SiteR.get({
          host: $rootScope.urlParser.getHostname()
  			}, function(dataResponse_success) {
          console.log('dataResponse_success', dataResponse_success);
          $scope.data_old = angular.copy(dataResponse_success.results[0]);
          $scope.data = angular.copy($scope.data_old);
  				resolve(dataResponse_success);
  			}, function(dataResponse_error) {
          console.log('dataResponse_error',dataResponse_error);
  				reject(dataResponse_error);
  			});
  		});
  	};

    // Sign Function Section
    $scope.signOut = function(){
      $rootScope.user = null;
      storageS.delete('user');
      storageS.delete('token');
      $rootScope.stateS.go('signIn', null, null);
    };

    // Update Function Section
    $scope.updateData = function(){
      $scope.data_update = { id:$scope.data_old.id }; // 업데이트할 값들만 넣는 객체
      for( var prop in $scope.data){ // 모든 key를 돌면서 value가 다른지 체크
        if(!($scope.data[prop]==$scope.data_old[prop])){
          $scope.data_update[prop] = $scope.data[prop];
        }
      };
      return $q(function(resolve, reject){
        SiteR.update($scope.data_update,
          function(dataResponse_success){
            var promises = [];
            promises.push($scope.updateDataPrices());
            promises.push($scope.updateDataEvents());
            $q.all(promises).then(function(){
              alert('성공적으로 저장되었습니다.');
              $rootScope.stateS.go('landing',null, null);
            }, function(){
              alert('에러가 발생했습니다.');
              $rootScope.stateS.go('landing',null, null);
            });
            $rootScope.stateS.go('landing',null, null);
          },function(dataResponse_error){
        });
      });
    };

    $scope.updateDataPrice = function(price){
      return $q(function(resolve, reject){
        if(price.show==false) PriceR.remove(price, function(){ resolve(); }, function(){ reject(); });
        else {
          if(!price.id)
            PriceR.save(price, function(){ resolve(); }, function(){ reject(); });
          else
            PriceR.update(price, function(){ resolve(); }, function(){ reject(); });
        }
      });
    };

    $scope.updateDataPrices = function() {
      return $q(function(resolve, reject){
        for(var i=0; i<$scope.data.prices.length; i++){
          $scope.data.prices[i].site=$scope.data_old.id;
          $scope.data.prices[i].order = i+1;
          $scope.updateDataPrice($scope.data.prices[i]);
          if(i==$scope.data.prices.length-1){
            resolve();
          }
        }
      });
    };

    $scope.updateDataEvent = function(event){
      return $q(function(resolve, reject){
        if(!event.id){
          EventR.save(event, function(){ resolve(); }, function(){ reject(); });
        } else{
          EventR.update(event, function(){ resolve(); }, function(){ reject(); });
        }
      });
    };

    $scope.updateDataEvents = function() {
      return $q(function(resolve, reject){
        for(var i=0; i<$scope.data.events.length; i++){
          $scope.data.events[i].site=$scope.data_old.id;
          $scope.data.events[i].order = i+1;
          $scope.updateDataEvent($scope.data.events[i]);
          if(i==$scope.data.events.length-1){
            resolve();
          }
        }
      });
    };

    // Initialize Function Section
    // $scope.initializeSelectableOnCalendar = function(){
    //   var current_href = location.href;
    //   if(current_href.indexOf('admin')>=0){ $scope.calendar_selectable = true; return; }
    //   $scope.calendar_selectable = false;
    // };

    $scope.initialize = function(){

      $scope.loadData();
      $scope.nailShop = {
        cover_title:"nailideparis",
        description:"유니크한 일상",
        cover_image:"images/landing/cover/cover.png",
        cover_logo:"images/landing/cover/cover_logo_basic.png",
        about_image:"images/landing/about/image_about.png",
        about_title:"유니크한 일상이 시작되는 곳",
        about_description:"손과 발끝에서 특별한 일상이 시작됩니다. 강남구 논현동에 위치한 네일 이로하는 10년 경력의 전문 디자이너가 여러분에게 숨겨진 매력을 찾아 바꾸는 일상을 경험해보세요. 해외에서 직수입한 재료로 최소의 인원에게만 이루어지는 네일아트. 섬세하고 품격있는 프리미엄 서비스를 만날 수 있습니다.",
        style_image1:"images/landing/stylebook/1.png",
        style_image2:"images/landing/stylebook/2.png",
        style_image3:"images/landing/stylebook/3.png",
        style_image4:"images/landing/stylebook/4.png",
        style_image5:"images/landing/stylebook/5.png",
        style_image6:"images/landing/stylebook/6.png",
        style_image7:"images/landing/stylebook/7.png",
        style_image8:"images/landing/stylebook/8.png",
        tel:"010 - 1111 - 2222",
        kakao:"nailideparis",
        kakaotalk_logo:"images/landing/contact/detail/kakaotalk_logo.png",
        location:"서울 다산로 258 동대문 리마크빌 B동 1922호",
        time_weekdays:"WEEKDAYS AM 05:00 ~ PM 08:00",
        time_weekend:"WEEKENDS AM 06:00 ~ PM 07:00"
      };
      if($rootScope.state.current.name =='landing/admin'){
        if(!$scope.checkAdmin()){
          $rootScope.stateS.go('signIn', null, null);
        }
      }
    };

    // Watch Function Section
    var watch1 = $rootScope.$watch('state.current.name', function(){
      if($rootScope.state.current.name=='landing'||$rootScope.state.current.name=='landing/admin'){
        $scope.initialize();
      }
    });
    $scope.$on('$destroy', function(){ watch1(); });

  });
