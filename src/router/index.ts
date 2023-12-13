import { createRouter, createWebHistory } from "vue-router";

let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/index",
      name: "index",
      component: () => import('@/views/index/index.vue'),
    }
  ],
  // 每次切换路由页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router;