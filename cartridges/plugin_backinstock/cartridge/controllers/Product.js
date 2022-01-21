'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var subscribeForm = server.forms.getForm('subscribe');
    subscribeForm.clear();

    res.setViewData({
        subscribeForm: subscribeForm
    });

    next();
});

module.exports = server.exports();