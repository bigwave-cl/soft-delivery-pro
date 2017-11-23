<template>
	<ask-modal  :show="show" 
				:title="title" 
				:closeIcon="icon" 
				:shade="shade"
				:shadeColor="shadeColor"
				:shadeClick="shadeClick"
				@oncancel="cancel" 
				@onclose="iconClose"
				:closeBtn="closeBtn"
				:class="theme">
		<div class="confirm-box" v-if="message" v-html="message">
		</div>
	    <ask-button slot="footer" class="confirm-btn" :text="cancelText" @ask-click="cancel"></ask-button>
	    <ask-button slot="footer" class="confirm-btn" @ask-click="sure" :disabled="okLoader">
	    	{{okText}}
			<inline-loader v-show="okLoader" class="ask-confirm-loader"></inline-loader>
	    </ask-button>
	</ask-modal>
</template>
<style src="./ask-confirm.scss" lang="scss"></style>
<script>
	import inlineLoader from '@core/inline-loader/inline-loader.vue';
	export default{
		components:{
			"inline-loader": inlineLoader
		},
		props:{
			shade:{
				type:Number,
				default:.4
			},
			shadeColor:{
				type:String,
				default:'#000'
			},
			shadeClick:{
				type:Boolean,
				default: true
			},
			show: {
				type:Boolean,
				default:false
			},
			message: {
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			icon: {
				type: Boolean,
				default:false
			}
		},
		data() {
			return {
				cancelText:'取消',
				okText:'确定',
				closeBtn: false,
				okLoader: false,
				theme: ''
			}
		},
		methods:{
			sure(){
				this.okLoader = true;
				this.$emit('onok');
			},
			cancel(){
				if(this.okLoader) return;
				this.$emit('oncancel');
			},
			close(){
				this.show = false;
			},
			iconClose(){
				if(this.okLoader) return;
				this.$emit('onclose');
			}
		}
	}
</script>