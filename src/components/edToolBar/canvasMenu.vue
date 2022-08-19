<template>
    <!-- 调整画布大小的二级菜单 -->
    <div class="menu_layout">
        <div class="background"></div>
        <ul class="list_layout">
            <!-- 输入 -->
            <li class="li">
                <!-- 通过失去焦点改变画布大小 -->
                <input class="input" @click.stop="" :value="`${canvas_size}`" @blur="fn_blur($event)"/>
            </li>
            <!-- 功能 -->
            <li
                class="li"
                v-for="(item, index) in menuData"
                :key="index"
                @click="fn_canvasSize(item.methodName)"
            >
                <div>{{ item.name }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'canvasMenu',
    data() {
        return {
            menuData: [
                {
                    name: '放大',
                    methodName: 'bigger',
                },
                {
                    name: '缩小',
                    methodName: 'smaller',
                },
                {
                    name: '适应画布',
                    methodName: 'fit',
                },
            ],
        };
    },
    computed:{

    },
    methods: {
        //画布方法
        fn_canvasSize(methodName) {
            //在这里写二级菜单功能
            switch (methodName) {
                //编写放大
                case 'bigger':
                    console.log('输出');

                    break;

                //编写缩小
                case 'smaller':
                    console.log('zhes');
                    break;
                //编写适应画布
                case 'fit':
                    console.log('2');
                    break;
            }
        },
        //输入框失去焦点后修改vuex中的数据
        fn_blur(e){

            this.$store.commit(`edToolBarData/fn_changeSize`,e.currentTarget.value);
        }
    },

    props:['canvas_size'],
    created() {},
};
</script>
<style scoped>
.background {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: -1px;
}
.menu_layout {
    position: absolute;
    top: 35px;
    left: -100px;
    background: #333333;
    width: 150px;
    font-size: 10px;
    color: white;
    border-radius: 3px;
}
.input {
    width: 100%;
    height: 100%;
    border: 3px solid #1683fb;
    background: #333333;
    color: white;
    font-size: 10px;
    border-radius: 2px;
    outline: none;
}
.list_layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
}
.li {
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}
.li:hover {
    background: #666666;
}
.background:hover {
    cursor: default;
}
</style>
