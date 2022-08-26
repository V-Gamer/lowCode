<template>
  <div
    class="shape-container"
    :style="{
      ...defaultStyle,
      'z-index': zIndex,
      top: defaultStyle.top + 'px',
      left: defaultStyle.left + 'px',
      width: defaultStyle.width + 'px',
      height: defaultStyle.height + 'px',
      'font-size': defaultStyle.fontSize + 'px',
    }"
  >
    <div
      class="shape"
      :class="{ 'shape-active': active }"
      @click="fn_selectCurComponent(zIndex)"
      @mousedown="fn_handleMouseDown($event)"
      @contextmenu="fn_handleContextmenu"
    >
      <div
        class="dot"
        v-for="(item, idx) in active ? pointList : []"
        :style="{ ...fn_getDotStyle(item.name) }"
        @mousedown="fn_mouseDownDot(item.name)"
        :key="idx"
      ></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "shape",
  props: {
    defaultStyle: Object,
    element: Object,
    zIndex: Number,
    active: Boolean,
  },
  computed: {
    // cmpt_getPointStyle(point) {},
  },
  data() {
    return {
      pointList: [
        {
          name: "upperLeft", // 左上
        },
        {
          name: "upperMiddle", // 中上
        },
        {
          name: "upperRight", // 右上
        },
        {
          name: "middleLeft", // 中左
        },
        {
          name: "middleRight", // 中右
        },
        {
          name: "lowerLeft", // 左下
        },
        {
          name: "lowerMiddle", // 中下
        },
        {
          name: "lowerRight", // 右下
        },
      ],
    };
  },
  methods: {
    // 选择组件事件
    fn_selectCurComponent(index) {
      this.$store.commit("componentData/fn_selectComponent", {
        curComponent: index,
      });
    },
    // 用户点击组件时间事件
    fn_handleContextmenu() {},
    // 获取各个点的style
    fn_getDotStyle(name) {
      let style = {};
      switch (name) {
        case "upperLeft":
          style["top"] = "-5px";
          style["left"] = "-5px";
          break;
        case "upperMiddle":
          style["top"] = "-5px";
          style["left"] = "50%";
          style["margin-left"] = "-5px";
          break;
        case "upperRight":
          style["top"] = "-5px";
          style["right"] = "-5px";
          break;
        case "middleLeft":
          style["top"] = "50%";
          style["left"] = "-5px";
          style["margin-top"] = "-5px";
          break;
        case "middleRight":
          style["top"] = "50%";
          style["right"] = "-5px";
          style["margin-top"] = "-5px";
          break;
        case "lowerLeft":
          style["bottom"] = "-5px";
          style["left"] = "-5px";
          break;
        case "lowerMiddle":
          style["bottom"] = "-5px";
          style["left"] = "50%";
          style["margin-left"] = "-5px";
          break;
        case "lowerRight":
          style["bottom"] = "-5px";
          style["right"] = "-5px";
          break;
      }
      return style;
    },
    // 圆点点击事件
    // 已知bug：
    // 1.右上角和左上角放大方向和正常放大方向相反
    // 2.上中，左中，右中，下中仍不可放大
    fn_mouseDownDot(name) {
      const mouseEvent = window.event;
      mouseEvent.stopPropagation(); // 阻止事件冒泡
      mouseEvent.preventDefault(); // 阻止事件捕获

      // 获取默认样式
      const defaultStyle = { ...this.defaultStyle };
      let { height, width, top, left } = defaultStyle; // 组件的基本样式
      height = parseFloat(height);
      width = parseFloat(width);
      top = parseFloat(top);
      left = parseFloat(left);
      const startX = mouseEvent.clientX; // 鼠标位置
      const startY = mouseEvent.clientY; // 鼠标位置

      // let needSave = false; // 是否需要记录
      const move = (moveEvent) => {
        // needSave = true;
        const clientX = moveEvent.clientX;
        const clientY = moveEvent.clientY;
        const distanceX = clientX - startX;
        const distanceY = clientY - startY;
        const newHeight = height + distanceY;
        const newWidth = width + distanceX;
        const newTop = top + distanceY;
        const newLeft = left + distanceX;
        const distanceY1 = startY - clientY;
        const distanceX1 = startX - clientX;
        if (name == "upperMiddle" || name == "lowerMiddle") {
          defaultStyle.height = newHeight > 0 ? newHeight : 0;
        } else if (name == "middleLeft" || name == "middleRight") {
          defaultStyle.width = newWidth > 0 ? newWidth : 0;
        } else {
          defaultStyle.height = newHeight > 0 ? newHeight : 0;
          defaultStyle.width = newWidth > 0 ? newWidth : 0;
        }

        // 移动点
        if (name == "upperLeft") {
          defaultStyle.top = newTop;
          defaultStyle.left = newLeft;
          defaultStyle.height =
            distanceY1 + height > 0 ? distanceY1 + height : 0;
          defaultStyle.width =
            distanceX1 + width > 0 ? distanceX1 + width : 0;
        } else if (name == "upperMiddle" || name == "upperRight") {
          defaultStyle.top = newTop;
          defaultStyle.height =
            distanceY1 + height > 0 ? distanceY1 + height : 0;
        } else if (name == "middleLeft" || name == "lowerLeft") {
          defaultStyle.left = newLeft;
          defaultStyle.width =
            distanceX1 + width > 0 ? distanceX1 + width : 0;
        }
        this.$store.commit("componentData/fn_setComponentStyle", defaultStyle);
      };

      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    // 按下鼠标事件
    fn_handleMouseDown(e) {
      if (this.zIndex == null) return;
      e.preventDefault();
      e.stopPropagation();

      const defaultStyle = { ...this.defaultStyle };
      const startY = e.clientY;
      const startX = e.clientX;
      const startTop = parseFloat(defaultStyle.top);
      const startLeft = parseFloat(defaultStyle.left);

      //拖动
      const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        defaultStyle.top = currY - startY + startTop;
        defaultStyle.left = currX - startX + startLeft;
        this.$store.commit("componentData/fn_setComponentStyle", defaultStyle);
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
.shape-container {
  position: absolute;
  .shape {
    width: 100%;
    height: 100%;
  }
  .shape-active {
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid #1684fc;
    box-sizing: border-box;
    .dot {
      box-sizing: border-box;
      width: 10px;
      height: 10px;
      background: #ffffff;
      display: inline-block;
      border-radius: 50%;
      border: 1px solid #1684fc;
      overflow: hidden;
      position: absolute;
    }
  }
}
</style>
