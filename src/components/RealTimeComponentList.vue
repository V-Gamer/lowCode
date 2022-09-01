<template>
    <div class="real-time-component-list">
        <div
            v-for="(item, index) in pagesComponents"
            :key="index"
            class="list"
        >
            <img class="rtImg" :src="item.picUrl" />
            <div>{{ item.label }}</div>
            <div class="rtCtrl">
                <!-- <div class="fnicon" @click="upComponent(transformIndex(index))">↑</div> -->
                <!-- <div class="fnicon" @click="downComponent(transformIndex(index))">↓</div> -->
                <!-- <div class="iconfont icon-shanchu" @click="deleteComponent(transformIndex(index))"></div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RealTimeComponentList",
    computed:{
        pagesComponents() {
            return this.$store.state.componentData.pagesComponents;
        },
    },
    methods: {
        getComponent(index) {
            // console.log("getComponent");
            return this.$store.state.componentData.pagesComponents[index]
        },

        transformIndex(index) {
            return this.$store.state.componentData.pagesComponents.length - 1 - index
        },

        onClick(index) {
            this.setCurComponent(index)
        },

        // deleteComponent() {
        //     setTimeout(() => {
        //         this.$store.commit('deleteComponent')
        //         this.$store.commit('recordSnapshot')
        //     })
        // },

        // upComponent() {
        //     setTimeout(() => {
        //         this.$store.commit('upComponent')
        //         this.$store.commit('recordSnapshot')
        //     })
        // },

        // downComponent() {
        //     setTimeout(() => {
        //         this.$store.commit('downComponent')
        //         this.$store.commit('recordSnapshot')
        //     })
        // },

        setCurComponent(index) {
            this.$store.commit('setCurComponent', { component: this.$store.state.componentData.pagesComponents[index], index })
        },
    },
}
</script>

<style lang="less" scoped>
.real-time-component-list {
    height: 35%;

    .list {
        height: 30px;
        cursor: grab;
        text-align: center;
        color: #333;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0 10px;
        position: relative;
        user-select: none;

        &:active {
            cursor: grabbing;
        }

        &:hover {
            background-color: rgba(200, 200, 200, .2);

            .icon-container {
                display: block;
            }
        }

        .rtImg{
            height: 20px;
            width: 20px;
            margin-right: 10px;
        }

        .rtCtrl{
            display: flex;
            flex-direction: row;
        }

        .fnicon{
            display: block;
        }

        .fnicon ：hover{
            display: block;
            background-color: #999;
        }
    }

    .actived {
        background: #ecf5ff;
        color: #409eff;
    }
}
</style>