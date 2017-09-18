// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "weui";

import Vuelidate from "vuelidate"

Vue.use(Vuelidate);

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
  template: '<App/>',
  components: {App}
})
