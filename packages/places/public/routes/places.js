'use strict';

angular.module('mean.places').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('places example page', {
            url: '/places',
            templateUrl: 'places/views/index.html'
        });
    }
]);
