<template>
  <div class="edit-container">

    <!-- 工具栏区域 -->
    <ed-toolbar/>
    <!-- <div class="ed-toolBar-container">
      <div class="ed-toolBar"></div>
    </div> -->


    <div class="edit-area">
      <!-- 组件列表框 -->
      <div class="component-list-container"></div>
      <!-- 画布区域 -->
      <div class="canvas-container">
        <div class="canvas-area">
          <!-- 画布大小由用户决定，此处用动态样式。我先默认随便用个宽高了 -->
          <div class="canvas">

          </div>
        </div>
      </div>
      <!-- 属性列表框 -->
      <div class="property-list-container">
        <!-- 属性列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import edToolbar from '../../components/edToolBar/edToolBar.vue'
export default {
  name: "editPage",
  mounted() {
    //this.$store.commit('testData/方法'，数据)
    //this.$store.dispatch('testData/方法'，数据)

    // console.log(this.$store.state.testData.tips);
  },
  components:{
    edToolbar
    
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>
