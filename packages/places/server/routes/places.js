'use strict';

var places = require('../controllers/places');
var _ = require('lodash');

// The Package is past automatically as first parameter
module.exports = function(Places, app, auth, database) {

    app.get('/places/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/places/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/places/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/api/1/places', placesRoute);
    app.post('/api/1/places', placesRoute);

    function placesRoute(req, res, next) {
        var params = req.body || req.query;

        places.search(_.extend({}, params)).then(function(places) {

            res.send({places: places});

        }).fail(function(err) {
            res.send({error: {message: err}});
        });

    }

    app.get('/places', function(req, res, next) {
        var params = req.query;

        places.search(_.extend({}, params)).then(function(places) {

            Places.render('places', {
                package: 'places',
                places: places
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });

        }).fail(function(err) {
            res.send(err);
        });

    });
};
