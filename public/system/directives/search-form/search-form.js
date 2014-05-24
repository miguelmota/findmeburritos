'use strict';

angular.module('mean.system').directive('btSearchForm', ['$log', '$rootScope', '$location', 'Places',
    function($log, $rootScope, $location, Places) {

        return {
            templateUrl: '/public/system/directives/search-form/search-form.tpl.html',
            restrict: 'A',
            scope: {

            },
            controller: function($scope, $element, $attrs) {

            },
            link: function($scope, element, attrs) {
                $scope.options = {
                    country: 'us',
                    types: '(regions)'
                };

                $scope.centered = attrs.centered;

                $scope.send = function() {
                    $log.info('Sending request');

                    $scope.page = 1;
                    var query = {location: $scope.location, page: $scope.page};
                    Places.get(query).success(function(data) {
                        $log.info(data);
                        $location.path('/places');
                    }).error(function(err) {
                        $log.error(err);
                    });

                };

                $scope.submitForm = function(isValid) {
                    $scope.submitted = true;
                    isValid  = true;
                    if (isValid) {
                        $scope.send();
                    }
                };

                $scope.$watch(function() {
                    return Places.getQuery();
                }, function(newVal) {
                    $log.info('getQuery', newVal);
                    _.extend($scope, $scope, newVal);
                });
            }
        };

    }]);
