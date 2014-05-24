'use strict';

angular.module('mean.system').service('Places', ['$log', '$resource', '$http', '$location', function($log, $resource, $http, $location) {
    var savedResults = {};
    var savedQuery = {};

    return {
        getData: function() {
            return savedResults;
        },
        setData: function(results) {
            $log.info('Data set:', results);
            savedResults = results;
        },
        clearData: function() {
            savedResults = {};
        },
        getQuery: function() {
            return savedQuery;
        },
        setQuery: function(query) {
            $log.info('Query set:', query);
            _.forOwn(query, function(v, k) {
                $location.search(k, v);
            });
            savedQuery = query;
        },
        clearQuery: function() {
            savedQuery = {};
        },
        get: function(query) {
            this.setQuery(query);
            var promise = $http({
                url: '/api/1/places',
                method: 'POST',
                data: query
            });
            promise.then(function(data) {
                this.setData(data.data);
            }.bind(this));

            return promise;
        }
    };
}]);
