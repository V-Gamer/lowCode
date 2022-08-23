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
          <div class="canvas-box">
            <div
              class="canvas"
              @click="fn_cancelSelectComponent"
              @drop="fn_handledrop($event)"
              @dragover="fn_handleDragOver"
            ></div>
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
          <componentPopup></componentPopup>
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
import ComponentPopup from "../../components/componentPopup/index.vue";
import vButton from "../../components/component/v-button.vue";
import ToolBar from "../../components/edToolBar/edToolBar.vue";

export default {
  name: "editPage",
  components: {
    Shape: Shape,
    Cpnt: component,
    ComponentPopup,
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
    };
  },
  created() {
    this.$store.commit(
      "componentData/fn_upDateCanvasList",
      this.pagesComponents
    );
  },
  methods: {
    // 取消组件选择
    fn_cancelSelectComponent() {
      // console.log(this.$store.state.componentData.curComponent);
      if (this.$store.state.componentData.curComponent == undefined) return;
      this.$store.commit("componentData/fn_selectComponent", {
        curComponent: undefined,
        editMode: "normal",
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
    fn_handledrop() {
      console.log(111);
      let { add_edit, addComIndex } = this.$store.state.componentData;
      console.log(add_edit, addComIndex);
      // if (!d_flag) {
      //   return;
      // }
      // //进行判断，仅组件库拖动才可进入实现元素添加
      // this.d_flag = 0;
      // console.log("asd");
      // e.preventDefault();
      // e.stopPropagation();

      // var div1 = document.createElement("button");
      // var canvas_a = document.querySelector(".canvas-area");
      // var canvas = document.querySelector(".canvas");

      // div1.style.backgroundColor = "pink";
      // div1.style.width = "50px";
      // div1.style.height = "50px";
      // div1.style.position = "absolute";

      // //将元素放到指定位置
      // div1.style.left = e.clientX - canvas_a.offsetLeft - this.d_indexX + "px";
      // div1.style.top = e.clientY - canvas_a.offsetTop - this.d_indexY + "px";
      // canvas.appendChild(div1);

      // this.components[this.c_index++] = div1; //将拖入元素放入数组存储

      // //添加事件，实现移动
      // div1.addEventListener("mousedown", function (e) {
      //   const startY = e.clientY;
      //   const startX = e.clientX;
      //   var el = e.currentTarget;
      //   var startLeft = el.offsetLeft;
      //   var startTop = el.offsetTop;

      //   const move = (moveEvent) => {
      //     const currX = moveEvent.clientX;
      //     const currY = moveEvent.clientY;
      //     el.style.top = currY - startY + startTop + "px";
      //     el.style.left = currX - startX + startLeft + "px";
      //   };
      //   const up = () => {
      //     document.removeEventListener("mousemove", move);
      //     document.removeEventListener("mouseup", up);
      //   };
      //   document.addEventListener("mousemove", move);
      //   document.addEventListener("mouseup", up);
      // });
    },
    fn_handleDragOver() {},
    // 画布上移动
    handleMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();

      const startY = e.clientY;
      const startX = e.clientX;
      var el = e.currentTarget;
      var startLeft = el.offsetLeft;
      var startTop = el.offsetTop;

      //拖动
      const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        el.style.top = currY - startY + startTop + "px";
        el.style.left = currX - startX + startLeft + "px";
      };
      //拖动结束
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>
