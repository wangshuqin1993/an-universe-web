import { defineConfig ,loadEnv} from 'vite'
import type { ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => defineConfig({
  plugins: [vue()],
  define: {
    "process.env": process.env ?? {},
  },
  base: "/",
  build: {
    outDir: 'dist', // 打包文件的输出目录
    assetsDir: 'static', // 静态资源的存放目录
    assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // 配置文件扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server:{
    proxy: {
      "/absc": {
        target:
        loadEnv(mode, process.cwd()).VITE_BASE_API,
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/absc/, ""),
      },
    }
  }
})
