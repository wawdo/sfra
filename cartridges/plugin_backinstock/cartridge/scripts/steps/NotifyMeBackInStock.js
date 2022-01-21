'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var TwilioService = require('plugin_backinstock/cartridge/scripts/TwilioService');
var Transaction = require('dw/system/Transaction');

function removeObject(customObject) {
    try {
        Transaction.wrap(function () {
            CustomObjectMgr.remove(customObject);
        });
    } catch (e) {
        return false;
    }

    return true;
}

module.exports.execute = function () {
    var customObjects = CustomObjectMgr.getAllCustomObjects('NotifyMeBackInStock');

    while (customObjects.hasNext()) {
        var customObject = customObjects.next();
        var productId = customObject.custom.productId;
        var product = ProductMgr.getProduct(productId);

        if (empty(product)) {
            removeObject(customObject);
            continue;
        }

        if (product.getAvailabilityModel().isInStock()) {
            var phoneNumbers = customObject.custom.phoneNumbers;
            var phonesArray = phoneNumbers.split(',');

            for (var phone of phonesArray) {
                var concatBody = 'To=' + phone + '&Body=' + productId + ' is back in stock&From=+16067558948';
                TwilioService.notifyBackInStock(concatBody);
            }
            removeObject(customObject);
        }
    }
}