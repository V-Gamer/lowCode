<template>
  <div class="edit-container">
    <!-- 工具栏区域 -->
    <div class="ed-toolBar-container">
      <div class="ed-toolBar">
        <ToolBar></ToolBar>
      </div>
    </div>
    <div class="edit-area">
      <!-- 组件列表框 -->
      <div class="component-list-container"></div>
      <!-- 画布区域 -->
      <div class="canvas-container">
        <div class="canvas-area">
          <!-- 画布大小由用户决定，此处用动态样式。我先默认随便用个宽高了 -->
          <div
            class="canvas-box"
            @drop="fn_handledrop($event)"
            @dragover="fn_handleDragOver"
          >
            <div
              class="canvas"
              @click="fn_cancelSelectComponent"
              style="z-index: 1"
            ></div>
            <!-- <div class="component-list-area"></div> -->
            <Shape
              v-for="(item, idx) in pagesComponents"
              :key="idx"
              :defaultStyle="item.style"
              :zIndex="idx"
              :element="item"
              :active="idx === curComponent"
            >
              <Cpnt
                :element="item"
                :type="item.component"
                :cmptStyle="{ ...item.style }"
                :propValue="item.propValue"
              >
              </Cpnt>
            </Shape>
          </div>
        </div>
        <!-- <div class="sub-menu-container">
          <componentPopup></componentPopup>
          <div class="canvas" @drop="handledrop($event)">
            <div id="test" @mousedown="handleMouseDown($event)">test</div>
          </div>
        </div> -->
        <div class="sub-menu-container">
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
        </div>
      </div>
      <!-- 属性列表框 -->
      <div class="property-list-container">
        <!-- 组件拖拽 -->
        <div
          class="test2"
          draggable="true"
          @dragstart="handledragstart($event)"
        >
          test2
        </div>
        <v-button :propValue="burl"></v-button>
        <!-- 属性列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import Shape from "../../components/shape.vue";
import component from "../../components/component.vue";
import vButton from "../../components/component/v-button.vue";
import ToolBar from "../../components/edToolBar/edToolBar.vue";

export default {
  name: "editPage",
  components: {
    Shape: Shape,
    Cpnt: component,
    vButton,
    ToolBar,
  },
  computed: {
    curComponent() {
      return this.$store.state.componentData.curComponent;
    },
  },
  data() {
    return {
      pages: [
        {
          name: "主页",
        },
        {
          name: "页面1",
        },
        {
          name: "页面2",
        },
        {
          name: "页面3",
        },
      ],
      pagesComponents: [
        {
          component: "v-text", // 组件名称，需要提前注册到 Vue
          label: "文字", // 左侧组件列表中显示的名字
          propValue: "文字", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          editMode: 0,
          style: {
            // 组件样式
            width: 200,
            height: 30,
            fontSize: 14,
            fontWeight: 500,
            top: 0,
            left: 0,
          },
        },
      ],
      components: [], //放入画布的元素
      c_index: 0, //放入画布元素个数
      d_flag: 0, //判断是否能添加元素
      d_indexX: 0, //拖拽元素偏移量
      d_indexY: 0,
      burl: "按钮",
      chooseComIdx: null,
      isComponentListShow: false, // 控制可拖拽组件列表是否显示
      comList: [
        {
          picUrl: require("./img/text.png"),
          label: "文字", // 左侧组件列表中显示的名字
          component: "v-text", // 组件名称，需要提前注册到 Vue
          propValue: "文字", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          editMode: 0,
          style: {
            width: "auto",
            height: "auto",
          },
        },
        {
          label: "矩形",
          picUrl: require("./img/rectangle.png"),
          component: "v-rectangle", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          editMode: 0,
          style: { width: "auto", height: "auto" },
        },
        {
          label: "圆形",
          picUrl: require("./img/circular.png"),
          component: "v-circular", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          editMode: 0,
          style: {
            width: "50px",
            height: "50px",
          },
        },
        {
          label: "线条",
          picUrl: require("./img/line.png"),
          component: "v-line", // 组件名称，需要提前注册到 Vue
          propValue: "", // 组件所使用的值
          icon: "el-icon-edit", // 左侧组件列表中显示的图标
          animations: [], // 动画列表
          events: {}, // 事件列表
          editMode: 0,
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
          editMode: 0,
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
          editMode: 0,
          style: {},
        },
      ],
    };
  },
  created() {
    this.pagesComponents.map((item) => {
      item.editMode = 0;
    });
    this.$store.commit(
      "componentData/fn_upDateCanvasList",
      this.pagesComponents
    );
  },
  methods: {
    // 取消组件选择
    fn_cancelSelectComponent() {
      // console.log(this.$store.state.componentData.curComponent);
      if (this.$store.state.componentData.curComponent == null) return;
      this.$store.commit("componentData/fn_selectComponent", {
        curComponent: null,
      });
    },
    //元素拖拽入画布
    //开始拖拽
    handledragstart(e) {
      this.d_flag = 1; //可添加
      console.log("asdf");
      //获取鼠标在图标上位置，得到偏移量
      this.d_indexX = e.clientX - e.target.offsetLeft;
      this.d_indexY = e.clientY - e.target.offsetTop;
    },
    // 开始拖动
    fn_handleDragStart(idx) {
      this.chooseComIdx = idx;
      this.$store.commit("componentData/fn_upDateChooseComponentIdx", idx);
      this.pagesComponents[idx].editMode = 1;
      this.$store.commit("componentData/fn_upDateComponentEditStatus", {
        idx: idx,
        editMode: 1,
      });
    },
    // 组件拖动事件
    fn_handleDragOver(e) {
      e.preventDefault();
    },
    // 组件停止拖拽事件
    fn_handledrop(e) {
      e.preventDefault();
      e.stopPropagation();
      let addComponent = JSON.parse(
        JSON.stringify(this.comList[this.chooseComIdx])
      );
      addComponent.style.top = e.offsetY + "px";
      addComponent.style.left = e.offsetX + "px";
      this.pagesComponents.push(addComponent);
      this.$store.commit(
        "componentData/fn_upDateCanvasList",
        this.pagesComponents
      );
      // this.$forceUpdate();
    },
    // 组件列表点击显示和消失事件
    fn_componentListShow() {
      this.isComponentListShow = !this.isComponentListShow;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
@import "./componentPopup.less";
</style>
