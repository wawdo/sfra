'use strict';

var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var SwapiService = require('*/cartridge/scripts/SwapiService.js');


server.get(
    'Info',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var deathstar = JSON.parse(SwapiService.getDeathStarInfo());
        
        res.render('deathstar',
        {
            deathstar: deathstar
        }); 
        next();
    }
);

module.exports = server.exports();
