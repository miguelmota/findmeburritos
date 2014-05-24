'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Places = new Module('places');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Places.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Places.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Places.menus.add({
        title: 'places example page',
        link: 'places example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Places.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Places.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Places.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Places;
});
