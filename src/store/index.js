import Vue from "vue"
import Vuex from "vuex" //引入vuex
import edToolBarData from './edToolBar'
Vue.use(Vuex) //使用vuex

export default new Vuex.Store({

  modules:{
    edToolBarData
  }
})