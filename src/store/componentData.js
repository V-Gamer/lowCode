export default {
  name: 'componentData',
  namespaced: true,
  state: {
    curComponent: undefined,
    editMode: 'normal',
    pagesComponents: [],
    addComIndex: null,
    add_edit:0, // 选中的组件是否可以添加到画布
  },
  mutations: {
    fn_selectComponent(state, data) {
      state.curComponent = data.curComponent;
      state.editMode = data.editMode;
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
      state.add_edit = data;
    }
  },
  actions: {

  },
}