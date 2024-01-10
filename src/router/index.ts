import { createRouter, createWebHistory } from "vue-router";
// absc/mint
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import('@/views/index/index.vue'),
    },
    {
      path: "/mint",
      name: "mint",
      component: () => import('@/views/absc/mint.vue'),
    },
    {
      path: "/ido",
      name: "ido",
      component: () => import('@/views/absc/iDo.vue'),
    },
  ],
  // 每次切换路由页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router;