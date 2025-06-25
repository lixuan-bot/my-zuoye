import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router/myRouter.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

const app = createApp(App)
app.use(ElementPlus,{locale})
app.use(router)
Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key])
})

app.mount('#app')