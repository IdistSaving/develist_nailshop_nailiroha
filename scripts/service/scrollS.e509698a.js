'use strict';

angular.module("nailShopApp")
	.service('scrollS', function($document){

		this.goElement = function(selector){
			console.log("selector",selector);
      var element = angular.element(document.querySelector(selector));
      var offset = 90;
      var duration = 1000;
			console.log("element",element);
      $document.scrollToElement(element, offset, duration);
			// console.log($document)
    };
  });
