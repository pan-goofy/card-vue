import { createApp } from 'vue'
import App from './components/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@element-plus/icons-vue"
import zhCN from "element-plus/dist/locale/zh-cn.mjs" //引入中文

const app = createApp(App)
app.use(ElementPlus,{locale:zhCN})
app.mount('#app')
