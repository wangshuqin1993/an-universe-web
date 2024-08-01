import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import Antd from "ant-design-vue";;
import './assets/index.css'
// import 'ant-design-vue/dist/antd.variable.min.css';
// import { createHead } from '@unhead/vue'
// import { VueRecaptchaPlugin } from 'vue-recaptcha';

// createApp(App).mount('#app')
import Vue3Marquee from 'vue3-marquee'
const app = createApp(App);

// const head = createHead()
// app.use(head)
// app.use(VueRecaptchaPlugin, {
//   v2SiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdwucYpAAAAAOUWqJ13bhliE9dEml2vKqPGSEcb',
// })
app.use(router);
app.use(Antd);
app.use(Vue3Marquee);
app.mount("#app");
