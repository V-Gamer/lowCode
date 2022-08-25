export default {
    name: 'edToolBar',
    namespaced: true,
    state: {
        //控制工具栏中间展示
        mid_show: true,
        //控制左边第一个二级菜单显示
        left_menu_show: false,
        //控制对齐二级菜单
        align_menu_show: false,
        //控制图层二级菜单
        layer_menu_show: false,
        //控制画布二级菜单
        canvas_menu_show: false,
        //控制画布大小
        canvas_size: '50%',
    },
    actions: {},
    mutations: {
        clickShowComponent(state,componentName)
        {
            
        },
        //改变各种v-show
        fn_change(state, context) {
            state[context] = !state[context];
        },
        //关闭二级菜单
        fn_close(state) {
            state.left_menu_show = false;
            state.align_menu_show = false;
            state.layer_menu_show = false;
            state.canvas_menu_show = false;
        },
        //修改画布大小的值
        fn_changeSize(state, context) {
            //正则判断传来的值是否含有百分号
            let patt1 = new RegExp(/^\d+%$/);
            if (patt1.test(context)) {
                //修改
                state.canvas_size = context;
            }
        },
    },
    
};
