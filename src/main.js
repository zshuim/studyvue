import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/reset.css'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入拦截器
import '@/api/Interceptor'
Vue.config.productionTip = false
// Vue.config.devtools = true


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
