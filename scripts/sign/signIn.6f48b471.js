'use strict';

angular.module('nailShopApp')
.controller('SignInCtrl', function($rootScope, $scope, $resource, storageS, SignInR) {

  // Check Function Section
  $scope.checkUser = function() {
    if (!$scope.email) {
      alert('이메일을 입력해주세요');
      return false ;
    }
    if (!$scope.password) {
      alert('비밀번호를 입력해주세요');
      return false ;
    }
    return true;
  };
  $scope.checkAdmin = function(){
    if(!($rootScope.user&&$rootScope.user.develist_user_profile
      &&$rootScope.site&&$rootScope.site.user_profile
      &&($rootScope.site.user_profile == $rootScope.user.develist_user_profile))){
      return false;
    } else { return true; }
  };

  // Click Function Section
  $scope.clickHelp = function(){
    alert('사이트 문의는 연락주세요!\n\n전화 : 070 - 7004 - 0331');
  };

  // Close Function Section
  $scope.closeLogin = function(){
    $rootScope.stateS.go('landing', null, null);
  };

  // Sign Function Section
  $scope.signIn = function() {
    if (!$scope.checkUser()) return;
    storageS.delete('token');
    SignInR.save({
      email: $scope.email,
      password: $scope.password
    }, function(SignInResponse) {
      console.log('SignInResponse', SignInResponse);
      console.log('$rootScope.site', $rootScope.site);
      if(SignInResponse.user&&SignInResponse.user.develist_user_profile
        &&$rootScope.site&&$rootScope.site.user_profile
        &&($rootScope.site.user_profile == SignInResponse.user.develist_user_profile)
      ){
        console.log('1');
        $rootScope.user = angular.copy(SignInResponse.user);
        storageS.set('user', $rootScope.user);
        storageS.set('token', SignInResponse.token.key);
        $rootScope.stateS.go('landing/admin', null, null);
      } else{
        console.log('2');
        $rootScope.user = null;
        storageS.delete('user');
        storageS.delete('token');
        $rootScope.responseMessage(SignInResponse);
      }
    }, function(SignInResponse) {
      $rootScope.user = null;
      storageS.delete('user');
      storageS.delete('token');
      $rootScope.responseMessage(SignInResponse);
    });
  };

  // Initialize Function Section
  $scope.initialize = function() {
    if($scope.checkAdmin()){
      $rootScope.stateS.go('landing/admin');
    } else {
      $rootScope.user = null;
      storageS.delete('user');
      storageS.delete('token');
    }
  };
  // Watch Function Section
  var watch1 = $rootScope.$watch('state.current.name', function(){
    if($rootScope.state.current.name=='signIn'){
      $scope.initialize();
    }
  });
  var watch2 = $rootScope.$watch('user', function(){
    $scope.initialize();
  });
  $scope.$on('$destroy', function(){ watch1(); watch2(); });

});
