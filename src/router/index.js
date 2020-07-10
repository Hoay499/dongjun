import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/Index.vue'
import Login from '../views/Login/Login.vue'
import Home from '../views/home/home.vue'
import welcome from '../components/welcome/welcome.vue'
import records from '../components/records/records.vue'


Vue.use(VueRouter)

const routes = [
	//页面重定向,如果用户访问的是根路径则页面重定向到login页面
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/index',
		component: Index
	},
	{  
		path: '/home',
		component: Home,
		redirect:'/welcome',
		children:[
			{
				path:'/welcome',
				component:welcome
			},
			{
				path:'/viewRecords',
				component:records
			}
		]
	},
]

const router = new VueRouter({
	mode: 'history',
	routes
})

//  挂载路由导航守卫
router.beforeEach((Urlto, Urlfrom, next) => {
	// Urlto 将要访问的路径
	// Urlfrom 代表从哪个路径跳转而来
	//  next 函数，表示通过放行 next('/login') 强制跳转
	if (Urlto.path === '/login' || Urlto.path === '/') {
		return next();
	}
	// 获取token
	const tokenStr = window.sessionStorage.getItem('token');
	if (!tokenStr) {
		return next();
	}
	next();
})

export default router
