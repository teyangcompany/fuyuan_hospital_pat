// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "weui"
import weui from './lib/wejs';
import vuelidate from 'vuelidate'
import Vuex from 'vuex'
import store from './store/index'
Vue.use(Vuex)
Vue.use(weui)
Vue.use(vuelidate)

Vue.config.productionTip = false

let remUnit = 100;     // 在px2rem中预设rem的值 即 1rem = ? px
let designWid = 750;  // 设计稿宽度
let winWid = window.innerWidth;
let bl = winWid / designWid;
window.rem2px = (bl * remUnit);
document.querySelector('html').style.fontSize = (bl * remUnit) + 'px';
window.appStartTime = new Date().getTime();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
