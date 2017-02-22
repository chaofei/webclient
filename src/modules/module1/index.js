
var Vue = require('vue');
var RestfulApi = require('restful/api.js');
var template=require('./module1.html');
// 定义组件
var comm = Vue.extend({
    template: template,
    data:{
        items : []
    }, 
    ready:function(){
        RestfulApi.call(this, 'module1Api1', function(data){
            this.$set('items', data)
        })
    }
});
module.exports=comm;