/**
 * Created by 李康飞 on 2017/9/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default  new Vuex.Store({
  state:{
    docObj:{}
  },
  mutations:{
    increment (state,obj){
      console.log(obj,555)
        state.docObj = obj;
      }
  },
  actions:{
   
  }
})