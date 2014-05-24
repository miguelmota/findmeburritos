'use strict';

angular.module('mean.system').directive('btPlaces', ['$log', '$rootScope', 'Places',
    function($log, $rootScope, Places) {

        return {
            templateUrl: '/public/system/directives/places/places.tpl.html',
            restrict: 'A',
            scope: {

            },
            controller: function($scope, $element, $attrs) {

            },
            link: function($scope, element, attrs) {
                function success() {
                    window.scrollTo(0,1);
                }
                $scope.next = function() {
                    var query = Places.getQuery();
                    Places.get(_.extend(query, {page: _.parseInt(query.page) + 1})).then(success);
                };
                $scope.prev = function() {
                    var query = Places.getQuery();
                    Places.get(_.extend(query, {page: _.parseInt(query.page) - 1})).then(success);
                };
                $scope.$watch(function() {
                    return Places.getData();
                }, function(newVal) {
                    $scope.places = newVal || {};
                    $scope.page = Places.getQuery().page;
                    $scope.showPagination = !!($scope.places.places && $scope.places.places.length);
                    $scope.showNext = !!($scope.page > 0);
                    $scope.showPrev = !!($scope.page > 1);
                });
                $scope.$watch(function() {
                    return Places.getQuery();
                }, function(newVal) {
                    _.extend($scope, $scope, newVal);
                });
            }
        };

}]);
