// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入全局样式和阿里图标库
import '../static/css/global.css';
import '../static/fonts/iconfont';


Vue.config.productionTip = false;

//引入安装缩略图
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//引入插件 vuex
import Vuex from 'vuex'
Vue.use(Vuex);

let store = new Vuex.Store({
   state:{
       num:0,
   },
    mutations:{
       // mutations 声明要做的事情
       addCartCount(state){
           state.num ++
       },
        reduceCartCount(state){
           if(state.num <=0) return
           state.num --
        }
    }
});



/* eslint-disable no-new */
new Vue({
    el: '#app',
    //安装
    store,
    router,
    components: {App},
    template: '<App/>'
});
