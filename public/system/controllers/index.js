'use strict';

angular.module('mean.system').controller('IndexController', ['$log', '$scope', '$rootScope', '$location', 'Global', 'Places', 'geolocation', function ($log, $scope, $rootScope, $location, Global, Places, geolocation) {
    $scope.global = Global;

    if (!Places.getQuery().location) {
        geolocation.getLocation().then(function(data){
            $scope.coords = {lat: data.coords.latitude, lng: data.coords.longitude};
            Places.setQuery({latlng: [$scope.coords.lat,$scope.coords.lng].join(','), location: 'Current Location'});
            $log.info($scope.coords);
        });
    }

}]);