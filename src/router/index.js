import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 页面
import index from '../view/index/index';
import editPage from '../view/editPage/index';
import test from '../view/test/index'

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: '/index',
      name: '首页',
      component: index
    },
    {
      path: '/editPage',
      name: '编辑页',
      component: editPage
    },
    {
      path: '/test',
      name: '测试',
      component: test
    },
  ]
})