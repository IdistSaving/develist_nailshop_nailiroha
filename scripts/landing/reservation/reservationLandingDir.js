'use strict';

angular.module("nailShopApp")
	.directive("reservationLandingDir", function ($rootScope, ngDialog, eventService) {
		return {
			link: function (scope, element, attrs) {

				var calEventStatus = [];

		    /* Required functions */

		    var isEventOverDiv = function(x, y) {

		      var external_events = $( '#external-events' );
		      var offset = external_events.offset();
		      offset.right = external_events.width();
		      offset.bottom = external_events.height();

		      // Compare
		      if (x >= offset.left
		        && y >= offset.top
		        && x <= offset.right
		        && y <= offset .bottom) { return true; }
		      return false;
		    }


		    function makeEventsDraggable () {

		      $('.fc-draggable').each(function() {

		        // store data so the calendar knows to render an event upon drop
		        $(this).data('event', {
		          title: $.trim($(this).text()), // use the element's text as the event title
		          stick: false // maintain when user navigates (see docs on the renderEvent method)
		        });
		        // make the event draggable using jQuery UI
		        $(this).draggable({
		          zIndex: 999,
		          revert: false,      // will cause the event to go back to its
		          revertDuration: 0  //  original position after the drag
		        });

		        console.log('makeEventsDraggable');

		        // Dirty fix to remove highlighted blue background
		        $("td").removeClass("fc-highlight");
		      });
		    }

		    /* initialize the external events
		    -----------------------------------------------------------------*/

		    $('#external-events .fc-event').each(function() {

		      // store data so the calendar knows to render an event upon drop
		      $(this).data('event', {
		        title: $.trim($(this).text()), // use the element's text as the event title
		        stick: false // maintain when user navigates (see docs on the renderEvent method)
		      });

		      // make the event draggable using jQuery UI
		      $(this).draggable({
		        zIndex: 999,
		        revert: false,      // will cause the event to go back to its
		        revertDuration: 0  //  original position after the drag
		      });
		    });
		    var events = [];
		    // if(localStorage.getItem('calendar_events')){
		    // 	events = angular.fromJson(localStorage.getItem('calendar_events'));
		    // }

		    var calendar = $('#calendar').fullCalendar({
					height: 750,
		      locale:'ko',
					lang:'ko',
					// monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			    // monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			    // dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
			    // dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
		      header : {
		        left: 'today prev,next',
		        center: 'title',
		        right: 'agendaWeek,agendaDay'
		      },
					views:{
						week:{
							titleFormat: 'YYYY MMM DD',
							columnFormat: 'ddd M/D',
							minTime:'07:30:00',
							maxTime:'22:00:00'

							// titleFormat, columnFormat, timeFormat
						}
					},
		      defaultView: 'agendaWeek',
		      events: scope.data.events,
					timeFormat: 'h:mm',
					columnFormat: 'ddd M/D',
		      droppable: true, // this allows things to be dropped onto the calendar
		      dragRevertDuration: 0,
		      slotDuration: '00:30:00',
		      snapDuration: '00:15:00',
		      eventLimit: true, // allow "more" link when too many events
		      selectable: ($rootScope.state.current.name == 'landing/admin') ? true : false,
		      selectHelper: true,
					eventRender: function(event, element) {
		        element.bind('click', function(){
							if($rootScope.state.current.name == 'landing/admin'){
								console.info('event',event);
								console.info('$rootScope.calendar_event',$rootScope.calendar_event);
		          $rootScope.calendar_event = event;
							// eventService.events = scope.data.events;

		          ngDialog.open({template:'views/dialog/dialog.html', controller: ['$scope', function($scope){
								$scope = scope;
								console.log($scope);
								$scope.close = function(){
						  		ngDialog.close();
						  	};

						    // Delete Function
						  	$scope.delete = function(){
						      // console.info('eventService.events',eventService.events);
						      // console.info('$scope',$scope);
						    	var is_delete = confirm('예약을 삭제하시나요?');
						    	if(is_delete){
						      	$('#calendar').fullCalendar('removeEvents',$rootScope.calendar_event._id);
						      	// localStorage.removeItem('calendar_events');
										var clientEvents = $('#calendar').fullCalendar('clientEvents');
						        // console.info('clientEvents',clientEvents);
						        angular.forEach(clientEvents, function(event, event_index){
											console.info('clientEvents',clientEvents);
						          // var event_remove = {
						          //   title:event.title,
						        	// 	start:event.start,
						        	// 	end: event.end,
						          // };
						          // console.info('event_remove',event_remove);
						          // if($rootScope.calendar_event._id) scope.data.events.push(event_remove);{
											// 	event.show = false;
											// }
											console.info('$rootScope.calendar_event._id',$rootScope.calendar_event._id)
											// if($rootScope.calendar_event._id) event.show = false;
						        });
						      	// localStorage.setItem('calendar_events', JSON.stringify( events ) );
						    	}
						    	$scope.close();
						  	};
							}],
							// 'DialogCtrl',
							scope:scope, showClose:false});

							}
							false;
		        });
				    // element.bind('dblclick', function() {
				    // });
					},
		      select: function(start, end, allDay) {
						console.info('start',start);
		        var title = prompt('Event Title:');
		        if (title) {
		          calendar.fullCalendar('renderEvent',
		            {
		              title: title,
		              start: start,
		              end: end,
		              className: "calendar-new-event",
		              // allDay: allDay
		            },
		            true // make the event "stick"
		          );
		          var clientEvents = calendar.fullCalendar('clientEvents');
		          scope.data.events = [];
		          angular.forEach(clientEvents, function(event, event_index){
								var event_new = {
		          		title:event.title,
		          		start:event.start,
		          		end: event.end
		          	};
								// console.info('event_new',event_new);
								// console.info('event.start',event.start);
								if(event._id&&Number(event._id)>0) event_new['id'] = Number(event._id);
		          	scope.data.events.push(event_new);
								console.info('scope.data.events',scope.data.events);
		          });
							// ****save 주는 공간
		          // localStorage.setItem('calendar_events', JSON.stringify( events ) );
		        }
		        calendar.fullCalendar('unselect');
		      },
		      editable: ($rootScope.state.current.name == 'landing/admin') ? true : false,
		      drop: function(date, jsEvent, ui) {
		        console.log('calendar 2 drop');
		        console.log(date);
		        console.log(jsEvent);
		        console.log(ui);
		        console.log(this);
		        // is the "remove after drop" checkbox checked?
		        if ($('#drop-remove').is(':checked')) {
		          // if so, remove the element from the "Draggable Events" list
		          $(this).remove();
		        }
		        // if event dropped from another calendar, remove from that calendar
		        if (typeof calEventStatus['calendar'] != 'undefined') {
		          $(calEventStatus['calendar']).fullCalendar('removeEvents', calEventStatus['event_id']);
		        }
		        makeEventsDraggable();
		      },
		      eventReceive: function( event ) { console.log('calendar 2 eventReceive');
		        makeEventsDraggable();
		      },
		      eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) { console.log('calendar 2 eventDrop');
		        makeEventsDraggable();
		      },
		      eventDragStart: function( event, jsEvent, ui, view ) {
		        // Add dragging event in global var
		        calEventStatus['calendar'] = '#calendar';
		        calEventStatus['event_id'] = event._id;
		        console.log('calendar 2 eventDragStart');
		      },
		      eventDragStop: function( event, jsEvent, ui, view ) {  console.log('calendar 2 eventDragStop');

		        // if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
		        //   $('#calendar').fullCalendar('removeEvents', event._id);
		        //   var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
		        //     el.draggable({
		        //     zIndex: 999,
		        //     revert: true,
		        //     revertDuration: 0
		        //   });
		        //   el.data('event', { title: event.title, id :event.id, stick: true });
		        // }

		        calEventStatus = []; // Empty
		        makeEventsDraggable();
		      },
		      eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
		        makeEventsDraggable();
		      },
		      viewRender: function() {
						// console.log('calendar 2 viewRender');
		        makeEventsDraggable();
		      }
		    });

			},
			replace: true,
			scope:{
				data:"=data"
			},
			restrict:"EA",
			templateUrl: 'views/landing/reservation/reservationLandingDir.html'
		};
	});
