import { createRouter, createWebHistory } from "vue-router";
const envData = import.meta.env.VITE_NODE_ENV

// absc/mint
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import('@/views/index/index.vue'),
      meta: {
        isShow: true,
      }
    },
    {
      path: "/mint",
      name: "NFT",
      component: () => import('@/views/absc/mint.vue'),
      meta: {
        isShow: true,
      }
    },
    // {
    //   path: "/ido/:invite_code",
    //   name: "IDO_INVITE",
    //   component: () => import('@/views/absc/iDo.vue'),
    //   meta: {
    //     isShow: false,
    //   }
    // },
    // {
    //   path: "/whitelist",
    //   name: "Whitelist(IDO)",
    //   component: () => import('@/views/absc/whiteList.vue'),
    //   meta: {
    //     isShow: true,
    //   }
    // },
    // {
    //   path: "/nftIdo",
    //   name: "NFT(IDO)",
    //   component: () => import('@/views/absc/nftIdo.vue'),
    //   meta: {
    //     isShow: true,
    //   }
    // },
    // {
    //   path: "/ido",
    //   name: "IDO",
    //   component: () => import('@/views/absc/iDo.vue'),
    //   meta: {
    //     isShow:true,
    //   }
    // },
    {
      path: "/ido-claim",
      name: "Claim",
      component: () => import('@/views/absc/claim.vue'),
      meta: {
        isShow:true,
      }
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router;