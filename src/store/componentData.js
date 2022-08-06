export default {
  name: 'componentData',
  namespaced: true,
  state: {
    curComponent: undefined,
    editMode: 'normal',
    canvasComponentList: [],
  },
  mutations: {
    fn_selectComponent(state, data) {
      state.curComponent = data.curComponent;
      state.editMode = data.editMode;
    },
    fn_setComponentStyle(state, data) {
      state.canvasComponentList[state.curComponent].style = { ...data };
    },
    fm_upDateCanvasList(state, data) {
      state.canvasComponentList = data;
    }
  },
  actions: {

  },
}