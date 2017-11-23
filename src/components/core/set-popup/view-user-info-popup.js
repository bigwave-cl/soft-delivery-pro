/*
* @Author: askMeWhy
* @Date:   2017-11-20 14:52:54
* @Last Modified by:   smile
* @Last Modified time: 2017-11-22 11:28:02
*/
import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './view-user-info-popup.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const viewUserInfoPopup = (onClose) => {
	let vm = new VueComponent({router}).$mount();
	vm.$on('onclose', () => {
		vm.show = false;
		if(onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}
