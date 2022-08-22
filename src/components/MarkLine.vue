<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      :key="line"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
      ref="line"
    ></div>
  </div>
</template>

<script>
import Eventbus from "../utils/eventBus";
import { mapState } from "vuex";
import getComponentStyle from "@/utils/style";
export default {
  data() {
    return {
      lines: ["x_top", "x_center", "x_bottom", "y_left", "y_center", "y_right"],
      diff: 3,
      lineShowStatus: {
        xl: false,
        xc: false,
        xt: false,
        yt: false,
        yc: false,
        yb: false,
      },
    };
  },
  computed: mapState(["curComponent", "componentData"]),
  mounted() {
    Eventbus.$on("move", (Downward, RightWard) => {
      this.fn_showline(Downward, RightWard);
    });
    Eventbus.$on("unmove", () => {
      this.fn_hideLine();
    });
  },
  methods: {
    fn_showline() {
      const line = this.$refs.line;
      const components = this.componentData;
      const curComponentStyle = getComponentStyle(this.curComponent.style);
      const curComponentXCenter =
        (curComponentStyle.top + curComponentStyle.bottom) / 2;
      const curComponentYCenter =
        (curComponentStyle.left + curComponentStyle.right) / 2;

      this.fn_hideLine();

      components.forEach((component) => {
        if (component === this.curComponent) return;
        const componentStyle = getComponentStyle(component.style);
        const { left, top, right, bottom } = componentStyle;
        const componentXCenter = (top + bottom) / 2;
        const componentYCenter = (left + right) / 2;

        const conditions = {
          top: [
            {
              isNearly: this.isNearly(curComponentStyle.top, top),
              lineNode: lines.xt[0], // xt
              line: "x_top",
              dragShift: top,
              lineShift: top,
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, top),
              lineNode: lines.xt[0], // xt
              line: "x_top",
              dragShift: top - curComponentStyle.height,
              lineShift: top,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentXCenter,
                top + component.style.height / 2
              ),
              lineNode: lines.xc[0], // xc
              line: "x_center",
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: top + componentHalfHeight,
            },
            {
              isNearly: this.isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb[0], // xb
              line: "x_bottom",
              dragShift: bottom,
              lineShift: bottom,
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb[0], // xb
              line: "x_bottom",
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom,
            },
          ],
          left: [
            {
              isNearly: this.isNearly(curComponentStyle.left, left),
              lineNode: lines.yl[0], // yl
              line: "y_left",
              dragShift: left,
              lineShift: left,
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, left),
              lineNode: lines.yl[0], // yl
              line: "y_left",
              dragShift: left - curComponentStyle.width,
              lineShift: left,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentStyle.left + curComponentHalfwidth,
                left + componentHalfwidth
              ),
              lineNode: lines.yc[0], // yc
              line: "y_center",
              dragShift: left + componentHalfwidth - curComponentHalfwidth,
              lineShift: left + componentHalfwidth,
            },
            {
              isNearly: this.isNearly(curComponentStyle.left, right),
              lineNode: lines.yr[0], // yr
              line: "y_right",
              dragShift: right,
              lineShift: right,
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, right),
              lineNode: lines.yr[0], // yr
              line: "y_right",
              dragShift: right - curComponentStyle.width,
              lineShift: right,
            },
          ],
        };
      });
    },
    chooseTheTureLine(needToShow, isDownward, isRightward) {
      if (isRightward) {
        if (needToShow.includes("yr")) {
          this.lineStatus.yr = true;
        } else if (needToShow.includes("yc")) {
          this.lineStatus.yc = true;
        } else if (needToShow.includes("yl")) {
          this.lineStatus.yl = true;
        }
      } else {
        if (needToShow.includes("yl")) {
          this.lineStatus.yl = true;
        } else if (needToShow.includes("yc")) {
          this.lineStatus.yc = true;
        } else if (needToShow.includes("yr")) {
          this.lineStatus.yr = true;
        }
      }

      if (isDownward) {
        if (needToShow.includes("xb")) {
          this.lineStatus.xb = true;
        } else if (needToShow.includes("xc")) {
          this.lineStatus.xc = true;
        } else if (needToShow.includes("xt")) {
          this.lineStatus.xt = true;
        }
      } else {
        if (needToShow.includes("xt")) {
          this.lineStatus.xt = true;
        } else if (needToShow.includes("xc")) {
          this.lineStatus.xc = true;
        } else if (needToShow.includes("xb")) {
          this.lineStatus.xb = true;
        }
      }
    },
    isNearly(dragValue, targetValue) {
      return Math.abs(dragValue - targetValue) <= this.diff;
    },

    fn_hideLine() {
      Object.keys(this.lineShowStatus).forEach((lineId) => {
        this.lineShowStatus[lineId] = false;
      });
    },
  },
};
</script>

<style scoped>
.mark-line {
    height: 100%;
}

.line {
    background: #59c7f9;
    position: absolute;
    z-index: 1000;
}

.xline {
    width: 100%;
    height: 1px;
}

.yline {
    width: 1px;
    height: 100%;
}
</style>
