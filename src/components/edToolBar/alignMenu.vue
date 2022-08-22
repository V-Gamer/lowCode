<template>
    <!-- 图层的二级菜单 -->
    <div class="menu_layout">
        <div class="background"></div>
        <ul class="list_layout">
            <li
                class="li"
                v-for="(item, index) in menuData"
                :key="index"
                @click="fn_align(item.methodName)"
            >
                <div>{{ item.name }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'alignMenu',

    data() {
        return {
            menuData: [
                {
                    name: '左对齐',
                    methodName: 'left_aligned',
                },
                {
                    name: '水平居中',
                    methodName: 'center_horizontally',
                },
                {
                    name: '右对齐',
                    methodName: 'right_aligned',
                },
                {
                    name: '顶对齐',
                    methodName: 'top_aligned',
                },
                {
                    name: '垂直居中',
                    methodName: 'center_vertically',
                },
                {
                    name: '底对齐',
                    methodName: 'bottom_aligned',
                },
            ],
        };
    },
    methods: {
        fn_align(methodName) {
            //在这里写二级菜单功能
            switch (methodName) {
                //编写左对齐方法
                case 'left_aligned':
                    console.log('输出');

                    break;

                //编写水平居中
                case 'center_horizontally':
                    console.log('zhes');
                    break;
                //编写右对齐
                case 'right_aligned':
                    console.log('zhes');
                    break;
                //编写编写垂直居中
                case 'center_vertically':
                    console.log('zhes');
                    break;
                //编写顶对齐
                case 'top_aligned':
                    console.log('zhes');
                    break;
                //编写底对齐
                case 'bottom_aligned':
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
    left: -55px;
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
    cursor: default;
}
</style>
