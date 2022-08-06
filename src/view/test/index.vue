<template>
  <div class="canvas-container">
    <div class="canvas-area">
      <!-- 画布大小由用户决定，此处用动态样式。我先默认随便用个宽高了 -->
      <div class="canvas-box">
        <div class="canvas">
          <Shape
            v-for="(item, idx) in canvasComponentList"
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
    </div>
  </div>
</template>

<script>
import Shape from "../../components/shape.vue";
import component from "../../components/component.vue";
export default {
  name: "editPage",
  components: {
    Shape: Shape,
    Cpnt: component,
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
      componentsList: [
        {
          name: "群组",
          components: [
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
                height: 33,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: "",
                letterSpacing: 0,
                textAlign: "",
                color: "",
              },
            },
          ],
        },
      ],
      canvasComponentList: [
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
    };
  },
  created() {
    this.$store.commit(
      "componentData/fm_upDateCanvasList",
      this.canvasComponentList
    );
  },
  methods: {
    // 取消组件选择
    fn_cancelSelectComponent() {
      if (!this.$store.state.componentData.curComponent.curComponent) return;
      this.$store.commit("componentData/fn_selectComponent", {
        curComponent: undefined,
        editMode: "normal",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>