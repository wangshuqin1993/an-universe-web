import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import Antd from "ant-design-vue";
import "./assets/css/main.css";

// import 'ant-design-vue/dist/antd.variable.min.css';

// createApp(App).mount('#app')

const app = createApp(App);

app.use(router);
app.use(Antd);
app.mount("#app");
