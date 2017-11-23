/*
* @Author: askMeWhy
* @Date:   2017-11-20 14:52:54
* @Last Modified by:   smile
* @Last Modified time: 2017-11-21 15:31:36
*/
import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './add-area-popup.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const addAreaPopup = (onClose) => {
	let vm = new VueComponent({router}).$mount();
	vm.$on('onclose', () => {
		vm.show = false;
		if(onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}


import ComponentTemplateQuery from './query-area-popup.vue';
const VueComponentQuery = Vue.extend(ComponentTemplateQuery);

export const queryAreaPopup = (list,onClose) => {
	let vm = new VueComponentQuery({router}).$mount();
	if(Object.prototype.toString.call(list) =='[object Object]'){
		vm.query.push(list);
	}
	if(Object.prototype.toString.call(list) =='[object Array]'){
		vm.query = list;
	}
	vm.$on('onclose', () => {
		vm.show = false;
		if(onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}
