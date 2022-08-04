<template>
  <div class="edit-container">
    <!-- 工具栏区域 -->
    <div class="ed-toolBar-container">
      <div class="ed-toolBar"></div>
    </div>
    <div class="edit-area">
      <!-- 组件列表框 -->
      <div class="component-list-container"></div>
      <!-- 画布区域 -->
      <div class="canvas-container">
        <div class="canvas-area">
          <!-- 画布大小由用户决定，此处用动态样式。我先默认随便用个宽高了 -->
          <div class="canvas"></div>
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
export default {
  name: "editPage",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>
