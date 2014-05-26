'use strict';

angular.module('mean.system').service('Places', ['$log', '$resource', '$http', '$location', '$q', function($log, $resource, $http, $location, $q) {
    var savedResults = {};
    var savedQuery = {};
    var fetching = false;

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
        fetching: function(val) {
            $log.info('Fetching:', val);
            fetching = val;
            return this.fetched();
        },
        fetched: function() {
            return fetching;
        },
        get: function(query) {
            this.setQuery(query);
            this.fetching(true);
            var deferred = $q.defer();
            if (query.location === 'Current Location') {
                query = _.omit(query, ['location']);
            } else {
                query = _.omit(query, ['latlng']);
            }
            var promise = $http({
                url: '/api/1/places',
                method: 'POST',
                data: query
            });
            promise.then(function(data) {
                $log.debug(data);
                this.setData(data.data);
                this.fetching(false);
                if (_.has(data.data, 'places') && data.data.places.length === 0) {
                    return deferred.reject(new Error('No more results'));
                }
                return deferred.resolve(data);
            }.bind(this), function(err) {
                this.fetching(false);
                return deferred.reject(err);
            }.bind(this));

            return deferred.promise;
        }
    };
}]);
