// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "weui";
import Vuelidate from "vuelidate"

import auth2 from "./lib/auth2"

Vue.use(Vuelidate);

Vue.config.productionTip = false



window.onerror = function () {
  console.log("error", arguments);
  return false;
}

auth2(init);

function init() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
  })
}
