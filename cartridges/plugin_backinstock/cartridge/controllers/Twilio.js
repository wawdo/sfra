'use strict';

var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var Resource = require('dw/web/Resource');
var ProductMgr = require('dw/catalog/ProductMgr');

server.post('Subscribe', server.middleware.https, function (req, res, next) {
    var error = false;
    var type = 'NotifyMeBackInStock';
    var subscribeForm = server.forms.getForm('subscribe');
    var productId = subscribeForm.productId.value;
    var phone = subscribeForm.phone.value;

    if (!subscribeForm.valid || empty(productId) || empty(phone)) {
        res.json({
            msg: Resource.msg('error.message.notifybackinstock.form', 'product', null),
            error: true
        });
        return next();
    }

    var product = ProductMgr.getProduct(productId);
    if (empty(product)) {
        return next();
    }
    try {
        Transaction.wrap(function () {
            var notifyMeBackInStock = CustomObjectMgr.getCustomObject(type, productId);
            if (empty(notifyMeBackInStock)) {
                notifyMeBackInStock = CustomObjectMgr.createCustomObject(type, productId);
                notifyMeBackInStock.custom.productId = productId;
                notifyMeBackInStock.custom.phoneNumbers = phone;
            } else {
                var phoneNumbers = notifyMeBackInStock.custom.phoneNumbers;
                if (!phoneNumbers.includes(phone)) {
                    notifyMeBackInStock.custom.phoneNumbers = notifyMeBackInStock.custom.phoneNumbers + ',' + phone;
                }
            }
        });
    } catch (e) {
        error = true;
    }

    if (error) {
        res.json({
            msg: Resource.msg('error.message.notifybackinstock.form', 'product', null),
            error: true
        });
    } else {
        res.json({
            error: false,
            msg: Resource.msg('info.message.notifybackinstock.form', 'product', null)
        });
    }

    return next();
});

module.exports = server.exports();