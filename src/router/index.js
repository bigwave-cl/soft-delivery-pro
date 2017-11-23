import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Login from '@/views/login/login'

const APP_ROUTERS = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: { title: '安全递送', requiresAuth: true},
		children: [{
			path: ':imei',
			component: Home,
			name:'homeInfo',
			meta: { title: '安全递送', requiresAuth: true }
		}]
	},{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { title: '安全递送登录页面', requiresAuth: false}
	}
];

Vue.use(Router)
export default new Router({
	// mode: 'history',
	routes: APP_ROUTERS
})
