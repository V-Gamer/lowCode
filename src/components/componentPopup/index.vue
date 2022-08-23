<template>
  <div class="sub-menu">
    <div class="icon">
      <div class="sub-menu-icon" @click="fn_componentListShow">
        <img src="./img/func_icon.png" alt="" />
      </div>
    </div>

    <div class="component-popup" v-if="isComponentListShow">
      <div class="content-title">
        <span>组件</span>
      </div>
      <div class="componentList">
        <ul class="list">
          <li
            class="list-item"
            v-for="(item, idx) in comList"
            :key="idx"
            draggable
            @dragstart="fn_handleDragStart(idx)"
          >
            <div class="pic">
              <img :src="item.picUrl" alt="" />
            </div>
            <div class="text">{{ item.label }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentPopup",
  props: {},
  data() {
    return {
      isComponentListShow: false, // 控制可拖拽组件列表是否显示
      comList: [
        {
          picUrl: require("./img/text.png"),
          label: "文字", // 左侧组件列表中显示的名字
          component: "v-text", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: {},
        },
        {
          label: "矩形",
          picUrl: require("./img/rectangle.png"),
          component: "v-rectangle", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: {},
        },
        {
          label: "圆形",
          picUrl: require("./img/circular.png"),
          component: "v-circular", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: {},
        },
        {
          label: "线条",
          picUrl: require("./img/line.png"),
          component: "v-line", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: {},
        },
        {
          label: "图片",
          picUrl: require("./img/pic.png"),
          component: "v-pic", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: {},
        },
        {
          label: "按钮",
          picUrl: require("./img/button.png"),
          component: "v-button", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: {},
        },
      ],
      com_edit: 0,
      d_indexX: 0, //拖拽元素偏移量
      d_indexY: 0,
    };
  },
  methods: {
    // 组件列表点击显示和消失事件
    fn_componentListShow() {
      this.isComponentListShow = !this.isComponentListShow;
    },
    // 开始拖动
    fn_handleDragStart(idx) {
      console.log("选中的组件下标为", idx);
      this.$store.commit("componentData/fn_upDateChooseComponentIdx", idx);
      this.$store.commit("componentData/fn_upDateComponentEditStatus", 1);
    },
    // 组件拖动事件
    fn_handleDrop(e) {
      // 阻止冒泡和事件委托
      e.preventDefault();
      e.stopPropagation();
      // 克隆组件数据
      const component = { ...this.comList[e.dataTransfer.getData("idx")] };
      console.log(component);
      // this.$store.commit("addComponent", component);
    },
    // 组件点击事件
    fn_deselectCurComponent() {},
    // 组件停止拖拽事件
    fn_handleDragOver() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// 组件列表
.sub-menu {
  position: relative;
  .icon {
    width: 25px;
    height: 25px;
    padding: 2.5px;
    .sub-menu-icon {
      height: 25px;
      width: 25px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }

  .component-popup {
    width: 250px;
    height: 400px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    left: -254px;
    top: 0px;
    z-index: 100;
    .content-title {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      padding: 0 0 0 15px;
    }
    .componentList {
      .list {
        display: flex;
        padding: 0 4px 0 12px;
        flex-wrap: wrap;
        .list-item {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-between;
          background: rgb(247, 247, 247);
          border-radius: 5px;
          margin: 0 8px 8px 0;
          .pic {
            padding: 5px 6px;
            margin-top: 10px;
            img {
              display: block;
              width: 22px;
              height: 22px;
            }
          }
          .text {
            font-size: 12px;
            margin-bottom: 10px;
          }
        }
        .list-item:hover {
          background: rgb(229, 229, 229);
        }
      }
    }
  }
}
</style>
