import router from './index.js'
import { refreshTitle } from '@/utils';
import { User } from '@/services';
import Vue from 'vue';

const user = new User();

const beforeEach = (to, from, next) => {
	if(user.auth != 'none'){
		Vue.prototype.$user = {
			name: user.user.user || 'none',
			pass: user.user.pass || 'none',
			auth: user.auth,
			loginOut: user.loginOut
		};
	}

	if(to.meta.title){
		refreshTitle(to.meta.title);
	}else{
		refreshTitle('安全递送');
	}
	if(to.path == '/login' && user.auth != 'none'){
		refreshTitle('安全递送');
		next({
			replace: true,
			path: '/'
		});
	}else{
		if(to.meta.requiresAuth && user.auth == 'none'){
			next({
				path: '/login',
				replace: true,
				query: { redirect: to.fullPath }
			});
		}else{
			next();
		}
	}
};

const afterEach = (toRoute, fromRoute) => {
}

router.beforeEach(beforeEach)
router.afterEach(afterEach)