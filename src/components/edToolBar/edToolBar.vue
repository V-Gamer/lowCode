<template>
  <!-- 工具栏 -->
  <div class="ed-toolBarLayout" @click="fn_close($event)">
    <!-- 左边返回、和其他组件 -->
    <div class="left">
      <ul class="list_layout">
        <!-- 返回 -->
        <div class="back_layout">
          <div class="iconfont icon-back back" @click="fn_back()"></div>
          <div class="line"></div>
          <!-- 下拉菜单meun1 -->
          <div
            class="iconfont icon-triangle-solid triangle"
            @click.stop="fn_menuShow('left_menu_show')"
          ></div>
          <left-menu
            v-show="left_menu_show"
            @click.native="fn_menuShow('left_menu_show')"
            id="left_menu"
          />
        </div>
        <!-- 工具 -->
        <li class="li_layout" v-for="(item, index) in list_left" :key="index">
          <div class="iconfont" :class="item.icon"></div>
        </li>
      </ul>
    </div>

    <!-- 中间锁定和调整图层,点击画布上的组件后显示 通过this.$store.dispatch('edToolBar/fn_changeMidShow')控制-->
    <div v-show="mid_show" class="mid list_layout midList">
      <ul class="list_layout">
        <!-- 对齐 -->
        <li
          class="li_layout down_li"
          @click.stop="fn_menuShow('align_menu_show')"
        >
          <div class="iconfont icon-arranged"></div>
          <div class="iconfont icon-xiangxia down"></div>
          <!-- 对齐的二级菜单 -->
          <align-menu v-show="align_menu_show" id="align_menu" />
        </li>
        <!-- 图层 -->
        <li
          class="li_layout down_li"
          @click.stop="fn_menuShow('layer_menu_show')"
        >
          <div class="iconfont icon-layer"></div>
          <div class="iconfont icon-xiangxia down"></div>
          <!-- 图层的二级菜单 -->
          <layer-menu v-show="layer_menu_show" id="layer_menu" />
        </li>
        <!-- 锁定 需要从vuex中获得点击的组件状态 -->
        <li class="li_layout">
          <div v-show="true" class="iconfont icon-unlock"></div>
          <div v-show="false" class="iconfont icon-Lock"></div>
        </li>
      </ul>
    </div>
    <!-- 未点击画布上组件显示的中间内容 -->
    <div v-show="!mid_show" class="mid list_layout midList">5</div>

    <!-- 右边调整画布大小及其他 -->
    <div class="right">
      <ul class="rightList list_layout">
        <li class="li_layout" v-for="(item, index) in list_right" :key="index">
          <div class="iconfont" :class="item.icon"></div>
        </li>
        <li class="li_layout1 down_li_1">
          <div class="share">分享</div>
        </li>
        <!-- 调整画布大小 -->
        <li
          class="li_layout down_li_1"
          @click.stop="fn_menuShow('canvas_menu_show')"
        >
          <div class="canvas_sizeLayout">{{ canvas_size }}</div>
          <div class="iconfont icon-xiangxia down"></div>
          <!--画布的二级菜单 需传入画布大小 -->
          <canvas-menu
            v-show="canvas_menu_show"
            id="canvas_menu"
            :canvas_size="canvas_size"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import leftMenu from "./leftMenu";
import alignMenu from "./alignMenu";
import layerMenu from "./layerMenu";
import canvasMenu from "./canvasMenu";
export default {
  name: "edToolbar",
  data() {
    return {
      //左侧工具数据
      list_left: [
        {
          name: "文字",
          icon: "icon-text",
          tips_show: false,
        },
        {
          name: "矩形",
          icon: "icon-square",
          tips_show: false,
        },
        {
          name: "圆形",
          icon: "icon-circle",
          tips_show: false,
        },
        {
          name: "直线",
          icon: "icon-line",
          tips_show: false,
        },
        {
          name: "图片",
          icon: "icon-pic",
          tips_show: false,
        },
        {
          name: "批注",
          icon: "icon-position",
          tips_show: false,
        },
      ],
      //右边工具数据
      list_right: [
        {
          name: "下载",
          icon: "icon-download",
          tips_show: false,
        },
        {
          name: "预览",
          icon: "icon-play",
          tips_show: false,
        },
      ],
    };
  },
  computed: {
    //控制中间工具栏展示
    mid_show() {
      return this.$store.state.edToolBarData.mid_show;
    },
    //控制左边第一个二级菜单显示
    left_menu_show() {
      return this.$store.state.edToolBarData.left_menu_show;
    },
    //控制对齐二级菜单
    align_menu_show() {
      return this.$store.state.edToolBarData.align_menu_show;
    },
    //控制图层菜单
    layer_menu_show() {
      return this.$store.state.edToolBarData.layer_menu_show;
    },
    //控制画布大小菜单
    canvas_menu_show() {
      return this.$store.state.edToolBarData.canvas_menu_show;
    },
    //控制画布大小
    canvas_size() {
      return this.$store.state.edToolBarData.canvas_size;
    },
  },

  methods: {
    //后退功能
    fn_back() {
      this.$router.push({
        name: "首页",
      });
    },
    //控制二级菜单显示,参数是控制显示的变量名
    fn_menuShow(parms) {
      this.$store.commit(`edToolBarData/fn_change`, parms);
    },
    //实现点击二级菜单外关闭二级菜单
    fn_close(event) {
      // 传入event对象
      var el1 = document.getElementById("left_menu"); // 菜单id
      var el2 = document.getElementById("align_menu"); // 对齐菜单id
      var el3 = document.getElementById("layer_menu"); // 图层菜单id
      var el4 = document.getElementById("canvas_menu"); // 画布菜单id

      if (
        !el1.contains(event.target) ||
        !el2.contains(event.target) ||
        !el3.contains(event.target) ||
        !el4.contains(event.target)
      ) {
        // 判断菜单是否在点击范围内
        this.$store.commit(`edToolBarData/fn_close`);
      }
    },
  },
  components: {
    leftMenu,
    alignMenu,
    layerMenu,
    canvasMenu,
  },
  created() {},
};
</script>
<style scoped>
@import "../../assets/font/ToolBar/iconfont.css";

.ed-toolBarLayout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-bottom: 1px solid rgb(209, 209, 209);
  z-index: 20;
}
.left {
  margin-left: 5px;
}
.right {
  margin-right: 10px;
}
.left,
.right,
.mid {
  flex: 3;
}
.back_layout {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  background: #f2f2f2;
  padding: 3px;
  border-radius: 3px;
  transition: all ease-in-out 0.5s;
}

.back {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.triangle {
  font-size: 8px;
  padding: 5px;
}
.iconfont {
  color: #333333;
  font-weight: 600;
}
.down {
  font-size: 10px;
  margin-left: 3px;
}
.line {
  width: 1px;
  height: 15px;
  background: #c1c1c1;
  margin: 3px;
}

.list_layout {
  position: relative;
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
}
.midList {
  justify-content: center;
}
.rightList {
  justify-content: flex-end;
}
.li_layout {
  position: relative;
  height: 27px;
  width: 27px;
  border-radius: 4px;
  transition: all ease-in-out 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}
.li_layout1 {
  height: 27px;
  width: 27px;
  border-radius: 4px;
  transition: all ease-in-out 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  background: #1684fc;
}
.down_li {
  padding-left: 5px;
  padding-right: 5px;
}
.down_li_1 {
  padding-left: 10px;
  padding-right: 10px;
}
.canvas_sizeLayout {
  font-size: 13px;
}
.share {
  font-size: 12px;
  color: white;
  transition: all ease-in-out 0.5s;
}
.li_layout:hover {
  cursor: pointer;
  background: #e5e5e5;
}
.li_layout1:hover {
  cursor: pointer;
  background: #1169c9;
}
.back_layout:hover {
  cursor: pointer;
  background: #e5e5e5;
}
</style>
