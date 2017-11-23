/*
* @Author: askMeWhy
* @Date:   2017-11-20 14:52:54
* @Last Modified by:   smile
* @Last Modified time: 2017-11-22 16:02:22
*/
import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './view-box-list-popup.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const viewBoxListPopup = (onClose) => {
	let vm = new VueComponent({router}).$mount();
	vm.$on('onclose', () => {
		vm.show = false;
		if(onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}
