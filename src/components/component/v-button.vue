<!-- v-button组件 -->
<template>
  <input type="button" class="button" :value="propValue" />
</template>

<script>
export default {
  name: "editPage",
  props: {
    editMod: String, // 组件内容是否可修改
    propValue: String, // 组件的内容（例如文字等等）
  },
  data() {
    return {
      url: "ann",
    };
  },
  methods: {
    // textarea输入事件
    fn_handleInput() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.button {
  width: 40px;
  height: 40px;
}
</style>