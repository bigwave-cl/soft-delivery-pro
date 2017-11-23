// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.scss'
import router from './router'
import ASKComponents from './components/ask';
import './router/router.auth.js';
import VeeValidate from 'vee-validate'

Vue.config.keyCodes = {
  enter: 13
}
Vue.prototype.$user = null;
//是否为专业版，控制显示
Vue.prototype.$isPro = false;
Vue.config.productionTip = false
Vue.use(ASKComponents);
Vue.use(VeeValidate);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})