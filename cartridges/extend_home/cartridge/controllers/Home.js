'use strict';

var server = require('server');
var HookMgr = require('dw/system/HookMgr');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    var token;
    if(HookMgr.hasHook("dw.order.calculate")){
        token = HookMgr.callHook(
            "dw.createToken"
        )
    }
    viewData.users = [{
        "user":[
          {"Name":"John Doe", "token": token}
        ]
        }];
    res.setViewData(viewData);    
    next();
    
});

module.exports = server.exports();
