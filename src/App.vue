<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background: rgb(245, 245, 245);
}
a {
  color: rgb(65, 80, 88);
}
ul,
li {
  list-style: none;
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
