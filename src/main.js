// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import ASKComponents from './components/ask';
import './router/router.auth.js';
import './utils/element-components.js';
import VeeValidate from 'vee-validate'

Vue.config.keyCodes = {
  enter: 13
}
Vue.prototype.$user = null;
//是否为专业版，控制显示
Vue.prototype.$isPro = false; //是否是专业版 true=>是，false=>否
Vue.config.productionTip = false
Vue.use(ASKComponents);
Vue.use(VeeValidate);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
