import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router/router";
import store from "./store/";
import { routerMode } from "./config/env";
import "./config/rem";

Vue.use(VueRouter);
console.log("main.js", process.env.NODE_ENV);
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== "production",
  /**
   * 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，
   * 就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
   * 注意: 这个功能只在支持 history.pushState 的浏览器中可用。
   * scrollBehavior 函数接收 to和 from 路由对象，如 Navigation Guards。
   * 第三个参数 savedPosition，只有当这是一个 popstate 导航时才可用（由浏览器的后退/前进按钮触发）。
   * 该函数可以返回一个 ScrollToOptions 位置对象:
   * const router = createRouter({
   *  scrollBehavior(to, from, savedPosition) {
   *   // 始终滚动到顶部
   *   return { top: 0 }
   *   },
   *  })
   * detail:https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
   */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
});

new Vue({
  router,
  store,
}).$mount("#app");
