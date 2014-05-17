/*global google:false */
var component = angular.module('mapComponent', []);

component.directive('gmap', function($q) {
  'use strict';
  var geocoder = new google.maps.Geocoder();
  var map;
  var marker;
  var mapObj;
  var zoom;
  var infowindow;
  mapObj = {
    restrict: 'EA',
    scope: false,
    controller: function($scope, $element) {
      $scope.destination = '1600 Amphitheatre Parkway, Santa Clara County, CA';
      $scope.zoom = 10;
      $scope.type = 'roadmap';
      $scope.markerContent = 'Google HQ';
    },
    replace: false,
    templateUrl: 'mapTemplate.html',
    link: function(scope, element, attrs) {
      var zoom = parseInt(attrs.zoom, 10);
      var displayResults = function(results, status) {
        var location = results[0].geometry.location;

        if (status  === google.maps.GeocoderStatus.OK) {
          scope.map.setCenter(location);
          marker = new google.maps.Marker({
            map: scope.map,
            position: location,
            animation: google.maps.Animation.DROP
          });
          infowindow = new google.maps.InfoWindow({
            content: attrs.markerContent || scope.markerContent
          });
          google.maps.event.addListener(marker, 'click', function() {
            return infowindow.open(scope.map, marker);
          }, false);
        } else {
          console.error('Cannot Geocode ' + status);
        }


      };
      scope.renderMap = function() {
        var mapOptions = {
          zoom: zoom || scope.zoom,
          mapTypeId: attrs.type && attrs.type.toLowerCase() || scope.type,
          streetViewControl: false
        };
        scope.map = new google.maps.Map(document.getElementById('theMap'), mapOptions); // todo: use angular-element :)      
        scope.endPoint = attrs.destination || scope.destination;

        geocoder.geocode({
          address: scope.endPoint
        }, displayResults);



      };

      scope.renderMap();

    }
  };

  return mapObj;
});

component.directive('directions', ['$window', '$q',
  function($window, $q) {
    'use strict';
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var directionsObj;
    var isPanelSet;
    var directionsList;

    directionsObj = {
      restrict: 'EA',
      replace: true,
      templateUrl: 'directTemplate.html',
      link: function(scope, element) {
        var showDirections = function(response, status) {
          return status === google.maps.DirectionsStatus.OK 
          ? directionsDisplay.setDirections(response) 
          : console.warn(status);
        };
        directionsList = document.getElementById('directionsList');

        scope.getDirections = function() {
          var request = {
            origin: scope.origin,
            destination: scope.endPoint,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          };
          directionsService.route(request, showDirections);

          directionsDisplay.setMap(scope.map);
          directionsDisplay.setPanel(directionsList);
          scope.isPanelSet = true;

        };

        scope.clearDirections = function() {
          scope.renderMap();
          directionsDisplay.setPanel(null);
          scope.origin = '';
          scope.isPanelSet = false;
        };

        scope.printDirections = function() {
          return $window.print();
        };
      }
    };
    return directionsObj;
  }
]);
