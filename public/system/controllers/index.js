'use strict';

angular.module('mean.system').controller('IndexController', ['$log', '$scope', '$rootScope', '$location', 'Global', 'Places', function ($log, $scope, $rootScope, $location, Global, Places) {
    $scope.global = Global;

}]);