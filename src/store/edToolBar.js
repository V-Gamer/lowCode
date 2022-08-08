export default {
    name: 'edToolBarData',
    namespaced: true,
    actions: {},
    mutations: {
        //改变mid_show
        fn_changeMidShow(state){
            state.mid_show=!state.mid_show
        }
    },
    state: {
        //控制工具栏中间展示
        mid_show: true,
    },
};
