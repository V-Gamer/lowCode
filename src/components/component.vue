<template>
  <div class="component">
    <!-- v-text组件 -->
    <template v-if="type == 'v-text'">
      <vText
        :propValue="propValue"
        :element="element"
        :style="{
          ...cmptStyle,
        }"
      ></vText>
    </template>
    <!-- v-button组件 -->
  </div>
</template>

<script>
import vText from "./component/v-text.vue";
export default {
  name: "compnent",
  props: {
    type: String, // 组件类型
    cmptStyle: Object, // 组件样式
    propValue: String, // 组件的内容（例如文字等等）,
    element: Object,
  },
  components: {
    vText: vText,
  },
  data() {
    return {};
  },
  methods: {
    // textarea输入事件
    fn_handleInput() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.textarea {
  border: none;
  resize: none;
  outline: none;
  width: auto;
  height: auto;
  overflow-y: hidden;
  background: none;
}
</style>