'use strict';

angular.module('nailShopApp')
  .controller('DialogCtrl', function ($scope, $rootScope, ngDialog, eventService) {
  	$scope.close = function(){
  		ngDialog.close();
  	};

    // Delete Function
  	$scope.delete = function(){
      console.info('eventService.events',eventService.events);
      console.info('$scope',$scope);
    	var is_delete = confirm('예약을 삭제하시나요?');
    	if(is_delete){
      	$('#calendar').fullCalendar('removeEvents',$rootScope.calendar_event._id);
      	// localStorage.removeItem('calendar_events');
				var clientEvents = $('#calendar').fullCalendar('clientEvents');
        console.info('clientEvents',clientEvents);
        angular.forEach(clientEvents, function(event, event_index){
          var event_remove = {
            title:event.title,
        		start:event.start,
        		end: event.end,
          };
          console.info('event_remove',event_remove);
          // if()
          // scope.data.events.push(event_new);
        });
      	// localStorage.setItem('calendar_events', JSON.stringify( events ) );
    	}
    	$scope.close();
  	};
    // Change Function
  	// $scope.change = function(){
  	// 	$rootScope.calendar_event.className = ' bc-bk';
  	// 	$('#calendar').fullCalendar('updateEvent', $rootScope.calendar_event);
  	// 	var clientEvents = $('#calendar').fullCalendar('clientEvents');
  	// 	var events = [];
		// 	angular.forEach(clientEvents, function(event, event_index){
    //   	events.push({
    //   		title:event.title,
    //   		start:event.start,
    //   		end: event.end,
    //   		allDay: event.allDay,
    //   		className: event.className
    //   	});
    //   });
    // 	localStorage.setItem('calendar_events', JSON.stringify( events ) );
    // 	$scope.close();
  	// }
  	var initialize = function (){
  	};
  	initialize();
  });
