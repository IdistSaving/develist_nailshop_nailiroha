'use strict';

angular.module('nailShopApp')
	.config(function($resourceProvider, $stateProvider, $urlRouterProvider) {
		$resourceProvider.defaults.stripTrailingSlashes = false;

		$stateProvider
			// LANDING
			.state('landing', { url: '/', templateUrl: 'views/landing/landing.html', controller: 'LandingCtrl', group: 'landing', header: false, footer: false, full_page: true })
			.state('landing/admin', { url: '/admin', templateUrl: 'views/landing/landing.html', controller: 'LandingCtrl', group: 'landing', header: false, footer: false, full_page: true })

			// SIGN
			.state('signIn', { url: '/signIn', templateUrl: 'views/sign/signIn.html', controller: 'SignInCtrl', ignore:true});

		$urlRouterProvider.otherwise('/');
		// $urlRouterProvider.otherwise('/admin');

	});
