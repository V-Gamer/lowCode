<template>
    <!-- 图层的二级菜单 -->
    <div class="menu_layout">
        <div class="background"></div>
        <ul class="list_layout">
            <li
                class="li"
                v-for="(item, index) in menuData"
                :key="index"
                @click="fn_layer(item.methodName)"
            >
                <div>{{ item.name }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'layerMenu',

    data() {
        return {
            menuData: [
                {
                    name: '置顶',
                    methodName: 'top',
                },
                {
                    name: '置底',
                    methodName: 'bottom',
                },
                {
                    name: '上移一层',
                    methodName: 'move_up',
                },
                {
                    name: '下移一层',
                    methodName: 'move_down',
                },
                
            ],
        };
    },
    methods: {
        fn_layer(methodName) {
            //在这里写二级菜单功能
            switch (methodName) {
                //编写置顶方法
                case 'top':
                    console.log('输出');

                    break;

                //编写置底
                case 'bottom':
                    console.log('zhes');
                    break;
                //编写上移一层
                case 'move_up':
                    console.log('zhes');
                    break;
                //编写下移一层
                case 'move_down':
                    console.log('zhes');
                    break;

            }
        },
    },
    created() {},
};
</script>
<style scoped>
.background{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: -1px;

}
.menu_layout {
    position: absolute;
    top: 35px;
    left: -2px;
    background: #333333;
    width: 150px;
    font-size: 10px;
    color: white;
    border-radius: 3px;
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
.background:hover{
    cursor:default;
}
</style>
