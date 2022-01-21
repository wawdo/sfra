'use strict';

function notifyBackInStock(body) {
    var notifyBackInStockService = dw.svc.LocalServiceRegistry.createService('twilio.notifybackinstock.http.post', {
        createRequest: function (svc, args) {
            svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
            return args;
        },
        parseResponse: function (svc, client) {
            return client.text;
        }
    });
    var response = notifyBackInStockService.call(body).object;

    return response;
}

module.exports = {
    notifyBackInStock: notifyBackInStock
};