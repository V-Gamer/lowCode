import Vue from "vue"
import Vuex from "vuex" //引入vuex

import componentData from './componentData.js'
import edToolBarData from './edToolBar'

Vue.use(Vuex) //使用vuex

export default new Vuex.Store({
  modules: {
    componentData,
    edToolBarData
  }
})