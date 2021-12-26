'use strict';

function getDeathStarInfo() {
    var getSwapiService = dw.svc.LocalServiceRegistry.createService('http.swapi.getdeathstarinfo', {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            return args;
        },
        parseRequest: function (svc, client) {
            result = client.text;
            return {
                name: result.name,
                manufacturer: result.manufacturer,
                starship_class: result.starship_class
            };
        },
        filterLogMessage: function(msg){
            return msg.replace(/cost_in_credits\: \".*?\"/, "cost_in_credits:$$$$$$$$$$$$$$$$$$$");
        }
    });
    var response = getDeathStarInfo.call().object;

    return response;

}

module.exports = {
    getDeathStarInfo: getDeathStarInfo
};
