import Vue from "vue"
import Vuex from "vuex" //引入vuex

import componentData from './componentData.js'
import edToolBar from './edToolBar'
import snapShot from './snapShot'

Vue.use(Vuex) //使用vuex

export default new Vuex.Store({
  state:{
    ...componentData.state,
    ...edToolBarData.state,
    ...snapShot.state,

  },
  mutations:{
    ...edToolBar.mutations,
    ...componentData.mutations,
  },
  modules: {
    componentData,
    edToolBarData,
  }
})