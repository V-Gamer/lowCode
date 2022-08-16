export default {
  name: 'componentData',
  namespaced: true,
  state: {
    curComponent: undefined,
    editMode: 'normal',
    pagesComponents: [],
  },
  mutations: {
    fn_selectComponent(state, data) {
      state.curComponent = data.curComponent;
      state.editMode = data.editMode;
    },
    fn_setComponentStyle(state, data) {
      state.pagesComponents[state.curComponent].style = { ...data };
    },
    fm_upDateCanvasList(state, data) {
      state.pagesComponents = data;
    }
  },
  actions: {

  },
}