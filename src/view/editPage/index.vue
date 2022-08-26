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
                :editMode="item.editMode"
              >
              </Cpnt>
            </Shape>
          </div>
        </div>
        <!-- 组件列表 -->
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
        <div
          class="content-container"
          v-if="
            curComponent != null && cmpt_pagesComponents[curComponent].editMode
          "
        >
          <div class="nav-list">
            <div class="nav nav-active">样式</div>
          </div>
          <div class="style-list">
            <div class="align-box">
              <div class="list">
                <a href="javascript:void(0)" class="list-item" title="左对齐">
                  <span class="icon">
                    <img src="./img/horizontal-left-alignment.png" />
                  </span>
                </a>
                <a href="javascript:void(0)" class="list-item" title="水平居中">
                  <span class="icon">
                    <img src="./img/align-horizontal-center.png" />
                  </span>
                </a>
                <a href="javascript:void(0)" class="list-item" title="右对齐">
                  <span class="icon">
                    <img src="./img/horizontal-right-alignment.png" />
                  </span>
                </a>
                <a href="javascript:void(0)" class="list-item" title="顶部对齐">
                  <span class="icon">
                    <img src="./img/vertical-top-alignment.png" />
                  </span>
                </a>
                <a href="javascript:void(0)" class="list-item" title="垂直居中">
                  <span class="icon">
                    <img src="./img/align-vertical-center.png" />
                  </span>
                </a>
                <a href="javascript:void(0)" class="list-item" title="底对齐">
                  <span class="icon">
                    <img src="./img/vertical-bottom-alignment.png" />
                  </span>
                </a>
              </div>
            </div>
            <div class="name-box">
              <input
                class="name-inp"
                type="text"
                v-model="cmpt_pagesComponents[curComponent].propValue"
                @input="fn_handleInpText"
              />
            </div>
            <div class="position-box">
              <div class="position-container">
                <label class="position-info">
                  <span class="text">X</span>
                  <input
                    type="number"
                    @input="fn_handleChangeStyle"
                    v-model="cmpt_pagesComponents[curComponent].style.left"
                  />
                </label>
                <label class="position-info">
                  <span class="text">Y</span>
                  <input
                    type="number"
                    @input="fn_handleChangeStyle"
                    v-model="cmpt_pagesComponents[curComponent].style.top"
                  />
                </label>
                <label class="position-info">
                  <span class="text">W</span>
                  <input
                    type="number"
                    @input="fn_handleChangeStyle"
                    v-model="cmpt_pagesComponents[curComponent].style.width"
                  />
                </label>
                <label class="position-info">
                  <span class="text">H</span>
                  <input
                    type="number"
                    @input="fn_handleChangeStyle"
                    v-model="cmpt_pagesComponents[curComponent].style.height"
                  />
                </label>
              </div>
            </div>
            <div class="text-box style-box">
              <p class="title">文本</p>
              <div class="text-style-box">
                <div class="font">
                  <input
                    type="number"
                    class="font-size-inp"
                    @input="fn_handleChangeStyle"
                    v-model="cmpt_pagesComponents[curComponent].style.fontSize"
                  />
                  <div
                    class="font-color"
                    :style="{
                      background:
                        cmpt_pagesComponents[curComponent].style.color ||
                        '#000',
                    }"
                    @click="fn_isShowColorBox('font')"
                  ></div>
                  <div class="inpColor" v-if="isFontColorShow">
                    <span class="text">颜色编码</span>
                    <input
                      type="text"
                      class="inp"
                      @input="fn_handleChangeStyle"
                      v-model="cmpt_pagesComponents[curComponent].style.color"
                    />
                  </div>
                </div>
                <div class="text-align-box">
                  <div class="list">
                    <a href="javascript:void(0)" class="list-item">
                      <span class="icon">
                        <img src="./img/text-align-left-active.png" alt="" />
                      </span>
                    </a>
                    <a href="javascript:void(0)" class="list-item">
                      <span class="icon">
                        <img src="./img/text-align-center-active.png" alt="" />
                      </span>
                    </a>
                    <a href="javascript:void(0)" class="list-item">
                      <span class="icon">
                        <img src="./img/text-align-right-active.png" alt="" />
                      </span>
                    </a>
                    <a href="javascript:void(0)" class="list-item">
                      <span class="icon">
                        <img src="./img/text-align-justify-active.png" alt="" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="style-box outStyle-container">
              <p class="title">外观</p>
              <div class="outStyle-box">
                <div class="border-box-top">
                  <a class="list-item" href="javascript:void(0)">
                    <span class="icon">
                      <img src="./img/border.png" alt="" />
                    </span>
                  </a>
                  <a class="list-item" href="javascript:void(0)">
                    <span class="icon border-radius">
                      <img src="./img/border-radius.png" alt="" />
                    </span>
                  </a>
                  <div class="border-parmas">
                    <div class="all" v-if="1">
                      <input type="number" class="inp" />
                    </div>
                    <div class="per" v-else>
                      <input type="number" class="inp" />
                      <input type="number" class="inp" />
                      <input type="number" class="inp" />
                      <input type="number" class="inp" />
                    </div>
                  </div>
                </div>
                <div class="border-info-box">
                  <input type="checkbox" class="checkbox" />
                  <span
                    class="color-block"
                    @click="fn_isShowColorBox('background')"
                    :style="{
                      background:
                        cmpt_pagesComponents[curComponent].style.background ||
                        '',
                    }"
                  ></span>
                  <span class="text">填充</span>
                  <div class="inpColor" v-if="isBackgroundColorShow">
                    <span class="text">颜色编码</span>
                    <input
                      type="text"
                      class="inp"
                      @input="fn_handleChangeStyle"
                      v-model="
                        cmpt_pagesComponents[curComponent].style.background
                      "
                    />
                  </div>
                </div>
                <div class="border-info-box">
                  <input type="checkbox" class="checkbox" />
                  <span
                    class="color-block"
                    @click="fn_isShowColorBox('border')"
                    :style="{
                      background:
                        cmpt_pagesComponents[curComponent].style.borderColor ||
                        '',
                    }"
                  ></span>
                  <span class="text">描边</span>
                  <div class="inpColor" v-if="isBorderColorShow">
                    <span class="text">颜色编码</span>
                    <input
                      type="text"
                      class="inp"
                      @input="fn_handleChangeStyle"
                      v-model="cmpt_pagesComponents[curComponent].style.borderColor"
                    />
                  </div>
                </div>
                <div class="select-border-box">
                  <select
                    class="select-box"
                    @change="fn_handleSelect($event.target.value)"
                  >
                    <option value="solid">实线</option>
                    <option value="dashed">虚线</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Shape from "../../components/shape.vue";
import component from "../../components/component.vue";
import ToolBar from "../../components/edToolBar/edToolBar.vue";

export default {
  name: "editPage",
  components: {
    Shape: Shape,
    Cpnt: component,
    ToolBar,
  },
  computed: {
    curComponent() {
      return this.$store.state.componentData.curComponent;
    },
    cmpt_pagesComponents() {
      const { pagesComponents } =
        this.$store.state.componentData.pagesComponents;
      if (pagesComponents == null) return this.pagesComponents;
      return pagesComponents;
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
            color: "purple",
            border:1,
            borderColor:'',
            borderStyle:'solid'
          },
        },
      ],
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
      isFontColorShow: false,
      isBackgroundColorShow: false,
      isBorderColorShow: false,
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
      console.log("停止拖拽");
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
    // 边框样式选择事件
    fn_handleSelect(val) {
      console.log(val);
    },
    // 修改组件内容事件
    fn_handleInpText() {
      console.log("修改组件中");
      this.$store.commit(
        "componentData/fn_upDateCanvasList",
        this.pagesComponents
      );
      this.pagesComponents = this.$store.state.componentData.pagesComponents;
      console.log(this.pagesComponents);
      this.$forceUpdate();
    },
    // 修改组件left\top\width\height值
    fn_handleChangeStyle() {
      this.$store.commit(
        "componentData/fn_upDateCanvasList",
        this.pagesComponents
      );
    },
    // 修改字体颜色等等
    fn_isShowColorBox(name) {
      if (name == "font") {
        this.isFontColorShow = !this.isFontColorShow;
      } else if (name == "background") {
        this.isBackgroundColorShow = !this.isBackgroundColorShow;
      } else if (name == "border") {
        this.isBorderColorShow = !this.isBorderColorShow;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
@import "./componentPopup.less";
@import "./property-list.less";
</style>
