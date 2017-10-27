/**
 * Created by 李康飞 on 2017/9/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    docObj: {},
    playerSrc: ""
  },
  mutations: {
    increment(state, obj) {
      state.docObj = obj;
    },
    setPlayerSrc(state, src) {
      state.playerSrc = src
    }
  },
  actions: {}
})
