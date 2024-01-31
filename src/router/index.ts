import { createRouter, createWebHistory } from "vue-router";
// absc/mint
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import('@/views/index/index.vue'),
    },
    {
      path: "/mint",
      name: "NFT",
      component: () => import('@/views/absc/mint.vue'),
    },
    {
      path: "/ido",
      name: "IDO",
      component: () => import('@/views/absc/iDo.vue'),
    },
    {
      path: "/ido/:invite_code",
      name: "IDO_INVITE",
      component: () => import('@/views/absc/iDo.vue'),
    },
    {
      path: "/whitelist",
      name: "Whitelist(IDO)",
      component: () => import('@/views/absc/whiteList.vue'),
    },
    {
      path: "/nftIdo",
      name: "NFT(IDO)",
      component: () => import('@/views/absc/nftIdo.vue'),
    },
  ],
  // 每次切换路由页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router;