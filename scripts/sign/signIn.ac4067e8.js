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
      console.log($rootScope.site);
      console.log(SignInResponse.user);
      if(SignInResponse.user&&SignInResponse.user.develist_user_profile
        &&$rootScope.site&&$rootScope.site.user_profile
        &&($rootScope.site.user_profile == SignInResponse.user.develist_user_profile)
      ){
        $rootScope.user = angular.copy(SignInResponse.user);
        storageS.set('token', SignInResponse.token.key);
        $rootScope.stateS.go('landing/admin', null, null);
      } else{
        $rootScope.user = null;
        storageS.delete('token');
        $rootScope.responseMessage(SignInResponse);
      }
    }, function(SignInResponse) {
      $rootScope.user = null;
      storageS.delete('token');
      $rootScope.responseMessage(SignInResponse);
    });
  };


});
