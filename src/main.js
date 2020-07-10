import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config =>{
	console.log(config)
	config.headers.Authorization = sessionStorage.getItem('token');
	// 在最后必须返回config
	return config;
})


Vue.prototype.$http = axios
// flex 布局库
import 'flex.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
//  // Element
//  Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
