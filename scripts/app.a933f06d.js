'use strict';

/**
 * @ngdoc overview
 * @name sampleApp
 * @description
 * # sampleApp
 *
 * Main module of the application.
 */
angular
  .module('nailShopApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'ui.router',
    'angularMoment',
    'ngDialog',
    'duScroll',
    'ngUrlParser',
    'angular-inview',
    'ngFileUpload',
    'monospaced.elastic',
    'ngSrcs',
    'ngEnter'
  ])
  .run(function($rootScope, $state, $resource, lodash, urlParser, stateS, storageS, scrollS, TokenSignInR, SiteBasicR) {

    if(lodash) $rootScope._ = lodash;
    if($state) $rootScope.state = $state;
    if(stateS) $rootScope.stateS = stateS;
    if(scrollS) $rootScope.scrollS = scrollS;
    if(urlParser) $rootScope.urlParser = urlParser;
    if(storageS.get('user')) $rootScope.user = storageS.get('user');
    if(storageS.get('site')) $rootScope.site = storageS.get('site');
    if(storageS.get('token')){
      TokenSignInR.save({
        token: storageS.get('token')
      }, function(TokenSignInResponse) {
        $rootScope.user = TokenSignInResponse.user;
        storageS.set('user', $rootScope.user);
        storageS.set('token', TokenSignInResponse.token.key);
      }, function() {
        $rootScope.user = null;
        storageS.delete('token');
      });
    }

    SiteBasicR.get({host : $rootScope.urlParser.getHostname()}, function(SiteResponse){
      if(SiteResponse.results.length==1){
        $rootScope.site = angular.copy(SiteResponse.results[0]);
        if($rootScope.site) storageS.set('site', $rootScope.site);
      }
    }, function(){
      alert('새로고침 해주세요');
    });

    // Response Function Section
    $rootScope.responseMessage = function(response, success_alert) {
      if (success_alert && response.success) {
        alert(response.success);
      }
      if (response.fail) {
        alert(response.fail);
      }
      if (response.status == -1) {
        alert('인터넷 연결이 좋지 않습니다');
      }
    };
  });
