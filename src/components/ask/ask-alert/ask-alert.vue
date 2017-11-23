<template>
	<ask-modal  :show="show" 
				:title="title" 
				:closeIcon="icon" 
				:closeBtn="closeBtn"
				:shade="shade"
				:shadeColor="shadeColor"
				:shadeClick="shadeClick"
				:class="theme"
				@onclose="iconClose">
		<div class="ask-alert-box" v-if="message" v-html="message">
		</div>
	    <ask-button slot="footer" class="ask-alert-btn" @ask-click="sure" :disabled="okLoader">
	    	{{btnText}}
			<inline-loader v-show="okLoader"></inline-loader>
	    </ask-button>
	</ask-modal>
</template>
<style src="./ask-alert.scss" lang="scss"></style>
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
			},
			btnText:{
				type: String,
				default:'确定'
			},
			closeBtn:{
				type:Boolean,
				default:false
			},
			theme:[]
		},
		data() {
			return {
				okLoader: false
			}
		},
		methods:{
			sure(){
				this.okLoader = true;
				this.$emit('onok');
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