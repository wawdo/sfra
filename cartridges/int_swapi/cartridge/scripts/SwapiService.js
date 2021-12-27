'use strict';

function getDeathStarInfo() {
    var getSwapiService = dw.svc.LocalServiceRegistry.createService('http.swapi.getdeathstarinfo', {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            return args;
        },
        parseResponse: function (svc, client) {
            return client.text;
        },
        filterLogMessage: function(msg){
            return msg.replace(/cost_in_credits\: \".*?\"/, "cost_in_credits:$$$$$$$$$$$$$$$$$$$");
        }
    });
    var response = getSwapiService.call().object;

    return response;

}

module.exports = {
    getDeathStarInfo: getDeathStarInfo
};
