
var Vue = require('vue');
var template=require('./module1.html');
// 定义组件
var comm = Vue.extend({
    template: template,
    data:{
        items : []
    },
    ready:function(){
        var url='http://ccf.com/static/webpack-gulp-vue/php/module1.php';
        this.$http.get(url)
            .then((response) => {
                this.$set('items', response.data)
            })
            .catch(function(response) {
                console.log(response)
            })
    }
});
module.exports=comm;