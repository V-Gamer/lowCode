<template>
    <!-- 头部工具栏左边第一个二级菜单 -->
    <div class="menu_layout" >
        <div class="background"></div>
        <ul class="list_layout">
            <li class="li">
                <div>编辑</div>
                <div class="iconfont icon-triangle-solid sanjiao"></div>
                <!-- 三级菜单 -->
            </li>
            <li class="li">
                <div>视图</div>
                <div class="iconfont icon-triangle-solid sanjiao"></div>
            </li>
            <li class="li">偏好设置</li>

            <li class="li">
                <div>帮助</div>
                <div class="iconfont icon-triangle-solid sanjiao"></div>
            </li>
            <li class="li">快捷键</li>
            <li class="li">快速入门</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'leftMenu',
    data() {
        return {};
    },
    methods: {

    },
    mounted() {},
};
</script>
<style scoped>
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
.background{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: repeat;
}
.li {
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}
.sanjiao {
    font-size: 6px;
    color: white;
    transform: rotate(-90deg);
}
.li:hover {
    background: #666666;
}
.background:hover{
    cursor:default;
}
</style>
