var Vue = require('vue');
var RestfulGateWay = require('./gateway.js')

//对某一接口的结果做格式化
var formatResult = {
    module1Api1 : function(data){
        /**
         * 格式化接口返回的结果
         */
        return data;
    }
};

module.exports=function(apiName, cb){
    var self = this
    var callback = function(response){
        var data = response.data
        if(formatResult[apiName]) {
            data = formatResult[apiName].call(self, data)
        }
        cb.call(self, data)
    }
    if(!RestfulGateWay[apiName]) {
        return cb.call(this, null)
    }
    Vue.http.get(RestfulGateWay[apiName]).then(callback);
};