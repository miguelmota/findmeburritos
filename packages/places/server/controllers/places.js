'use strict';

var Q = require('q');
var _ = require('lodash');
var log = require('../lib/logger')(module);
var config = require('../config/config');

function compactObject(obj) {
    _.forOwn(obj, function(val, key) {
        if (!val) delete obj[key];
    });
    return obj;
}

var yelp = require('yelp').createClient({
    consumer_key: config.yelp.consumerKey,
    consumer_secret: config.yelp.consumerSecret,
    token: config.yelp.token,
    token_secret: config.yelp.tokenSecret
});

function format(data) {
    return _.map(data.businesses, function(p, i) {
        return {
            name: p.name,
            phone: p.phone,
            displayPhone: p.display_phone,
            location: {
                displayAddress: p.location.display_address.join(' ')
            },
            rating: p.rating,
            ratingImageUrl: p.rating_img_url_small,
            imageUrl: p.image_url,
            distance: p.distance,
            url: p.url
        };
    });
}

module.exports.search = function(opts) {
    opts = opts || {};
    var deferred = Q.defer();

    opts.offset = (((opts.page || 1) - 1) * 10);

    opts = compactObject(_.omit(_.defaults(opts, {
        term: 'burritos',
        location: '',
        limit: 10,
        offset: 0,
        sort: 1, // 0 - best match, 1 - distance, 2 - highest rated
        radius_filter: 40000, // 40000 max
        deals_filter: false,
        lang: 'en',
        cc: 'US',
        ll: null, // lat,lng
    }), ['page']));

    yelp.search(opts, function(error, data) {
        if (error) return deferred.reject(error);
        //log.info(data);
        return deferred.resolve(format(data));
    });

    return deferred.promise;
};
