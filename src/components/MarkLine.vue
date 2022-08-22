<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      v-show="lineShowStatus[line] || false"
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
    //挂载时监听画布中组件移动
    Eventbus.$on("move", (isDownward, isRightWard) => {
      this.fn_showline(isDownward, isRightWard);
    });
    Eventbus.$on("unmove", () => {
      this.fn_hideLine();
    });
  },
  methods: {
    fn_showline() {
      const line = this.$refs;
      const components = this.componentData;

      const curComponentStyle = getComponentStyle(this.curComponent.style);
      const curComponentHalfwidth = curComponentStyle.width / 2;
      const curComponentHalfHeight = curComponentStyle.height / 2;

      this.fn_hideLine();

      components.forEach((component) => {
        if (component === this.curComponent) return;
        const componentStyle = getComponentStyle(component.style);
        const { left, top, right, bottom } = componentStyle;
        const componentHalfwidth = componentStyle.width / 2;
        const componentHalfHeight = componentStyle.height / 2;

        const conditions = {
          top: [
            {
              isNearly: this.isNearly(curComponentStyle.top, top),
              lineNode: lines.xt[0], // xt
              line: "xt",
              dragShift: top,
              lineShift: top,
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, top),
              lineNode: lines.xt[0], // xt
              line: "xt",
              dragShift: top - curComponentStyle.height,
              lineShift: top,
            },
            {
              isNearly: this.isNearly(
                curComponentStyle.top + curComponentHalfHeight,
                top + componentHalfHeight
              ),
              lineNode: lines.xc[0], // xc
              line: "xc",
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: top + componentHalfHeight,
            },
            {
              isNearly: this.isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb[0], // xb
              line: "xb",
              dragShift: bottom,
              lineShift: bottom,
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb[0], // xb
              line: "xb",
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom,
            },
          ],
          left: [
            {
              isNearly: this.isNearly(curComponentStyle.left, left),
              lineNode: lines.yl[0], // yl
              line: "yl",
              dragShift: left,
              lineShift: left,
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, left),
              lineNode: lines.yl[0], // yl
              line: "yl",
              dragShift: left - curComponentStyle.width,
              lineShift: left,
            },
            {
              isNearly: this.isNearly(
                curComponentStyle.left + curComponentHalfwidth,
                left + componentHalfwidth
              ),
              lineNode: lines.yc[0], // yc
              line: "yc",
              dragShift: left + componentHalfwidth - curComponentHalfwidth,
              lineShift: left + componentHalfwidth,
            },
            {
              isNearly: this.isNearly(curComponentStyle.left, right),
              lineNode: lines.yr[0], // yr
              line: "yr",
              dragShift: right,
              lineShift: right,
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, right),
              lineNode: lines.yr[0], // yr
              line: "yr",
              dragShift: right - curComponentStyle.width,
              lineShift: right,
            },
          ],
        };

        const showItem = [];
        Object.keys(conditions).forEach((key) => {
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return;
            this.$store.commit("setShapeSingleStyle", {
              key,
              value: condition.dragShift,
            });

            condition.lineNode.style[key] = `${condition.lineShift}px`;
            needToShow.push(condition.line);
          });
        });

        if (needToShow.length) {
          this.chooseTheTureLine(needToShow, isDownward, isRightward);
        }
      });
    },

    //判断出真正需要的线，去除多余的线条，美观优化
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
    //判断距离是否足够小，需要发生吸附
    isNearly(dragValue, targetValue) {
      return Math.abs(dragValue - targetValue) <= this.diff;
    },
    //隐藏所有的标线
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
