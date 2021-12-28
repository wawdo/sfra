'use strict';

var server = require('server');

var UUIDUtils = require('dw/util/UUIDUtils');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

server.get('Create',  server.middleware.https, function (req, res, next) {
    var error = false;
    var form = req.httpParameterMap;
    if(form.name == "" || form.email == "") {
        error=true;
    }
    
    var type = 'NewsletterSubscription';
    var keyValue = UUIDUtils.createUUID();
    try {
        Transaction.wrap(function(){
            var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
            newsletter.custom.name = form.name;
            newsletter.custom.email = form.email;
            if(form.gender) {
                newsletter.custom.gender = form.gender;
            }
           
        });
    } catch (error) {
        error = true;
    }

    if (error) {
        res.json({
            error: true
        });
    } else {
        res.json({
            error: false,
            id: keyValue
        });
    }

    

    return next();
}
);

module.exports = server.exports();
