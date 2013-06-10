/*global google:false */
var component = angular.module('mapComponent', []);

component.directive('map', function () {
    'use strict';
    var geocoder = new google.maps.Geocoder(),
        map,
        marker,
        mapObj,
        zoom,
        infowindow;

    mapObj = {
        restrict: 'EAC',
        scope: false,
        controller: function ($scope, $element) {
            $scope.destination = '1600 Amphitheatre Parkway, Santa Clara County, CA';
            $scope.zoom = 15;
            $scope.type = 'roadmap';
            $scope.markerContent = 'Google HQ';
            
            
        },
        replace: false,
        templateUrl: 'mapTemplate.html',
        link: function (scope, element, attrs) {
            zoom = parseInt(attrs.zoom, 10);
            scope.init = function () {
                var mapOptions = {
                    zoom: attrs.zoom !== undefined ? zoom : scope.zoom,
                    mapTypeId: attrs.type !== undefined ? attrs.type.toLowerCase() : 'roadmap',
                    streetViewControl: false
                };
                scope.map = new google.maps.Map(document.getElementById('theMap'), mapOptions); // todo: use angular-element :)      
                scope.endPoint = attrs.destination !== undefined ? attrs.destination : '1600 Amphitheatre Parkway, Santa Clara County, CA';

                geocoder.geocode({
                    address: scope.endPoint
                }, function (results, status) {
                    var location = results[0].geometry.location;
                    if (status === google.maps.GeocoderStatus.OK) {
                        scope.map.setCenter(location);
                        marker = new google.maps.Marker({
                            map: scope.map,
                            position: location,
                            animation: google.maps.Animation.DROP
                        });
                        infowindow = new google.maps.InfoWindow({
                            content: attrs.markerContent !== undefined ? attrs.markerContent : 'Google HQ'
                        });
                        google.maps.event.addListener(marker, 'click', function () {
                            return infowindow.open(scope.map, marker);
                        });

                    } else {
                        alert('Cannot Geocode');
                    }

                });

            };

            scope.init();
        }
    };

    return mapObj;
});

component.directive('directions', function ($window) {
    'use strict';
    var directionsDisplay = new google.maps.DirectionsRenderer(),
        directionsService = new google.maps.DirectionsService(),
        directionsObj,
        isPanelSet,
        directionsList;

    directionsObj = {
        restrict: 'EAC',
        replace: true,
        templateUrl: 'directTemplate.html',
        link: function (scope, element) {
          directionsList = document.getElementById('directionsList');
          
            scope.getDirections = function () {
                var request = {
                    origin: scope.origin,
                    destination: scope.endPoint,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    return status === google.maps.DirectionsStatus.OK ? directionsDisplay.setDirections(response) : console.warn(status);
                });
                
                directionsDisplay.setMap(scope.map);
                directionsDisplay.setPanel(directionsList);
                return scope.isPanelSet = true;
               
            };
            
            scope.clearDirections = function () {
                scope.init();
                directionsDisplay.setPanel(null);
                scope.origin = '';
                return scope.isPanelSet = false;
            };

            scope.printDirections = function () {
                return $window.print();
            };
        }
    };
    return directionsObj;
});
