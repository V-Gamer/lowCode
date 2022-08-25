export default {
  name: 'componentData',
  namespaced: true,
  state: {
    curComponent: null,
    pagesComponents: [],
    addComIndex: null,
  },
  mutations: {
    fn_selectComponent(state, data) {
      if (data.curComponent == null) {
        state.pagesComponents[state.curComponent].editMode = 0;
      } else {
        state.curComponent = data.curComponent;
        state.pagesComponents[state.curComponent].editMode = 1;
        return;
      }
      state.curComponent = data.curComponent;

    },
    fn_setComponentStyle(state, data) {
      if (!state.pagesComponents[state.curComponent]) return
      state.pagesComponents[state.curComponent].style = { ...data };
    },
    fn_upDateCanvasList(state, data) {
      state.pagesComponents = data;
    },
    // 更新拖拽组件的下标
    fn_upDateChooseComponentIdx(state, data) {
      state.addComIndex = data;
    },
    // 更新组件状态
    fn_upDateComponentEditStatus(state, data) {
      state.pagesComponents[data.idx].editMode = data.editMode;
    }
  },
  actions: {

  },
}