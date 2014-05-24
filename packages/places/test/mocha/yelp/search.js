var assert = require('assert');
var config = require('../../../server/config/config');

var yelp = require('yelp').createClient({
    consumer_key: config.yelp.consumerKey,
    consumer_secret: config.yelp.consumerSecret,
    token: config.yelp.token,
    token_secret: config.yelp.tokenSecret
});

describe('<Unit Test>', function() {
    describe('Yelp:', function() {

        it('should be able to find burritos', function(done) {

            // See http://www.yelp.com/developers/documentation/v2/search_api
            yelp.search({term: 'burritos', location: 'Los Angeles'}, function(error, data) {
                //console.log(data);
                assert(data);
                assert(error === null);
                done();
            });
        });

        it.skip('should be able to find businesses', function(done) {

            // See http://www.yelp.com/developers/documentation/v2/business
            yelp.business('yelp-san-francisco', function(error, data) {
                assert(data);
                assert(error === null);
                done();
            });
        });

    });
});
