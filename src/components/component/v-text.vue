<!-- v-text组件 -->
<template>
  <textarea
    class="textarea"
    v-if="cmpt_editMode == 1"
    @input="fn_handleInput"
    maxlength="-1"
    :value="str"
  >
  </textarea>
  <div v-else>
    <div v-for="(str, idx) in str.split('/n')" :key="idx">
      {{ str }}
    </div>
  </div>
</template>

<script>
export default {
  name: "editPage",
  props: {
    element: Object, // 组件内容是否可修改
    propValue: String, // 组件的内容（例如文字等等）
  },
  computed: {
    cmpt_editMode() {
      const { pagesComponents, curComponent } = this.$store.state.componentData;
      if (curComponent === null) return 0;
      return pagesComponents[curComponent].editMode;
    },
    cmpt_propValue() {
      const { canvasComponentList, curComponent } =
        this.$store.state.componentData;
      return canvasComponentList[curComponent].propValue;
    },
  },
  data() {
    return {
      str: "",
    };
  },
  created() {
    this.str = this.propValue;
  },
  methods: {
    // textarea输入事件
    fn_handleInput(e) {
      console.log(e);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.textarea {
  height: 100%;
  width: 100%;
}
</style>