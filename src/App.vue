<template>
	<div id="app" class="container">
		<nav-bar></nav-bar>
		<router-view></router-view>
		<ask-loader :show="show"></ask-loader>
	</div>
</template>
<style src="./assets/font/iconfont.css" lang="css"></style>
<style src="./styles/base.scss" lang="scss"></style>
<script>
import askOverlay from '@/components/ask/ask-overlay/ask.overlay.js';
import Vue from 'vue';
import channel from '@/components/core/nav-bar/channel.js';
import navBar from '@/components/core/nav-bar/nav-bar.vue';

Vue.directive('nav',{
	inserted: function(el,binding){
		let data = binding.value;
		channel.$emit('UpdateNavBar',data);
	}
})
export default {
	name: 'app',
	provide() {
		return {
			rootMain: this
		};
	},
	components:{
		'nav-bar':navBar
	},
	data() {
		return {
			show: false,
			index: 0
		}
	},
	watch: {
		'$route' (to, from) {
			askOverlay.closeAll();
		}
	},
	methods: {
		/**
		 * 加载等待框
		 * @Author   陈龙
		 * @DateTime 2017-10-20
		 * @version  [version]
		 * @param    {[type]}   state Boolean: true|false true代表打开加载等待，false代表关闭加载等待
		 */
		loader(state) {
			if (state) {
				if (this.index == 0) this.show = true;
				this.index++;
			} else {
				this.index--;
				if (this.index == 0) this.show = false;
			}
		}
	}
}

</script>
