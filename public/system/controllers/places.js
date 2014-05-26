'use strict';

angular.module('mean.system').controller('PlacesController', ['$log', '$scope', '$rootScope', '$http', '$routeParams', '$location', 'Global', 'Menus', 'Places', 'geolocation',
    function($log, $scope, $rootScope, $http, $routeParams, $location, Global, Menus, Places, geolocation) {
        $scope.global = Global;

        $scope.init = function() {
            Places.get($location.search()).then(function() {});
        };

        $scope.init();
    }
]);
