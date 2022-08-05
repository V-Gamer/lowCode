<template>
  <div class="container">
    <main class="main-container">
      <!-- <div class="nav-container" :style="{ width: streWid + 'px' }"> -->
      <!-- <nav class="nav-list" :style="{ width: streWid - 35 + 'px' }"> -->
      <div class="nav-container">
        <nav class="nav-list-box">
          <div class="nav-list">
            <a
              href="javascript:void(0)"
              class="nav-item"
              v-for="(nav, index) in navList"
              :key="index"
              :class="{ 'nav-item-actived': curSideNavIdx == index }"
            >
              <div @click="fn_changeSideNav(index)">
                <!-- 图标 -->
                <!-- <span class="icon"></span> -->
                <span>{{ nav.text }}</span>
              </div>
            </a>
          </div>
        </nav>
        <!-- <div class="stretch-box " @mousedown="fn_drag" @mouseup="fn_dragEnd">
          <div class="dot-box">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div> -->
      </div>
      <div class="project-list">
        <p class="title">{{ navList[curSideNavIdx].text }}</p>
        <nav class="nav-list" v-if="navList[curSideNavIdx].subNav != undefined">
          <a
            href="javascript:void(0)"
            class="nav-item"
            v-for="(nav, idx) in navList[curSideNavIdx].subNav"
            :key="idx"
            :class="{ 'nav-item-actived': curConNavIdx == idx }"
            @click="fn_changeProjectNav(idx)"
          >
            {{ nav.text }}
          </a>
        </nav>
        <div class="list-container">
          <ul class="list" v-if="navList[curSideNavIdx].data == undefined">
            <li
              class="project-item"
              v-for="(prj, idx) in navList[curSideNavIdx].subNav[curConNavIdx]
                .data"
              :key="idx"
            >
              <article>
                <div class="main" @mouseover.capture="fn_touchProject(idx)">
                  <span class="logo">
                    <img src="./img/logo.png" alt="" />
                  </span>
                  <span class="icon-box" v-if="prj.type == 'computer'">
                    <span class="icon">
                      <img src="./img/computer.png" alt="" />
                    </span>
                  </span>
                  <span class="icon-box" v-if="prj.type == 'phone'">
                    <span class="icon">
                      <img src="./img/mobile-phone.png" alt="" />
                    </span>
                  </span>
                </div>
                <div
                  class="funcBox-container"
                  v-if="prj.funcBoxIsShow == true"
                  @mouseout="fn_hideFuncBox(idx)"
                >
                  <div class="funcBox">
                    <div class="perFunc-box">
                      <span class="func-icon">
                        <img src="./img/play.png" alt="" />
                      </span>
                      <span></span>
                    </div>
                    <div class="perFunc-box" @click="fn_toEdit(prj.id)">
                      <span class="func-icon">
                        <img src="./img/see.png" alt="" />
                      </span>
                    </div>
                    <div class="perFunc-box">
                      <span class="func-icon">
                        <img src="./img/more.png" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="prj-title">
                  <span>
                    {{ prj.title }}
                  </span>
                </div>
              </article>
            </li>
          </ul>
          <ul class="list" v-if="navList[curSideNavIdx].data != undefined">
            <li
              class="project-item"
              v-for="(prj, idx) in navList[curConNavIdx].data"
              :key="idx"
            >
              <article>
                <div class="main" @mouseover.capture="fn_touchProject(idx)">
                  <span class="logo">
                    <img src="./img/logo.png" alt="" />
                  </span>
                  <span class="icon-box" v-if="prj.type == 'computer'">
                    <span class="icon">
                      <img src="./img/computer.png" alt="" />
                    </span>
                  </span>
                  <span class="icon-box" v-if="prj.type == 'phone'">
                    <span class="icon">
                      <img src="./img/mobile-phone.png" alt="" />
                    </span>
                  </span>
                </div>
                <div
                  class="funcBox-container"
                  v-if="prj.funcBoxIsShow == true"
                  @mouseout="fn_hideFuncBox(idx)"
                >
                  <div class="funcBox">
                    <div class="perFunc-box">
                      <span class="func-icon">
                        <img src="./img/play.png" alt="" />
                      </span>
                      <span></span>
                    </div>
                    <div class="perFunc-box" @click="fn_toEdit(prj.id)">
                      <span class="func-icon">
                        <img src="./img/see.png" alt="" />
                      </span>
                    </div>
                    <div class="perFunc-box">
                      <span class="func-icon">
                        <img src="./img/more.png" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="prj-title">
                  <span>
                    {{ prj.title }}
                  </span>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      navList: [
        {
          text: "全部项目",
          name: "all",
          // iconUrl: require(""),
          subNav: [
            {
              text: "当前",
              name: "cur",
              data: [
                {
                  type: "computer",
                  title: "版本一",
                  id:1,
                  funcBoxIsShow: false, // projectlist的功能盒子是否显示
                },
                {
                  type: "phone",
                  title: "版本二",
                  id:2,
                  funcBoxIsShow: false,
                },
              ],
            },
            {
              text: "已锁定",
              name: "locked",
              data: [{}],
            },
          ],
        },
        {
          text: "星标项目",
          name: "star",
          // iconUrl: require(""),
          data: [
            {
              type: "computer",
              title: "版本一",
                  id:21,
              funcBoxIsShow: false, // projectlist的功能盒子是否显示
            },
            {
              type: "phone",
              title: "版本二",
                  id:13,
              funcBoxIsShow: false,
            },
          ],
        },
        {
          text: "项目回收站",
          name: "recycleBin",
          // iconUrl: require(""),
          data: [
            {
              type: "computer",
              title: "版本一",
              funcBoxIsShow: false, // projectlist的功能盒子是否显示
            },
            {
              type: "phone",
              title: "版本二",
              funcBoxIsShow: false,
            },
          ],
        },
      ],
      streWid: 180,
      curSideNavIdx: 0, // 当前侧边导航下标
      curConNavIdx: 0, // 当前内容导航下标
    };
  },
  computed: {},
  methods: {
    // 盒子点击拉伸
    fn_drag(e) {
      // 限定左键点击拉伸
      if (e.buttons != 1) {
        return;
      }
      this.fn_strechWidth();
    },
    // 盒子拉伸宽度变化监听
    fn_strechWidth() {
      window.addEventListener("mousemove", this.fn_mousemove);
    },
    // 盒子拉伸宽度变化
    fn_mousemove() {
      if (event.pageX < 175) {
        return;
      }
      this.streWid = event.pageX + 10;
    },
    // 放开鼠标停止拉伸
    fn_dragEnd() {
      console.log("end");
      window.removeEventListener("mousemove", this.fn_mousemove);
    },
    // 触摸项目盒子显示内容
    fn_touchProject(index) {
      // 当侧边导航为0 并且 该项目上的弹窗内容未显示
      // 通过这种判断来组织多次出发触摸事件
      let curSideNavIdx = this.curSideNavIdx;
      let curConNavIdx = this.curConNavIdx;
      let data = this.navList[curSideNavIdx].subNav[curConNavIdx].data[index];

      if (data.funcBoxIsShow) return;
      if (curSideNavIdx == 0) {
        data.funcBoxIsShow = true;
      }
    },
    // 离开项目盒子内容隐藏
    fn_hideFuncBox(index) {
      let curSideNavIdx = this.curSideNavIdx;
      let curConNavIdx = this.curConNavIdx;
      let data = this.navList[curSideNavIdx].subNav[curConNavIdx].data[index];
      data.funcBoxIsShow = false;
      this.$forceUpdate();
    },
    // 侧边导航切换事件
    fn_changeSideNav(index) {
      // 防止重复点击
      if (index == this.curSideNavIdx) return;
      this.curSideNavIdx = index;
    },
    // 项目导航切换事件
    fn_changeProjectNav(index) {
      // 防止重复点击
      if (index == this.curConNavIdx) return;
      this.curConNavIdx = index;
    },
    // 跳转事件
    fn_toEdit(index) {
      this.$router.push({ path: "editPage", query: { prjId: index } });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>