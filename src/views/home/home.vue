<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-view-box{
		position: relative;
		min-height: 100%;
	}
	.device-list{
		position: absolute;
		top: 0;
		left: 0;
		width: 270px;
		height: 100%;
		bottom: 0;
		background-color: map-get($color,300);
		z-index: 3;
	}
	.device-info{
		padding-left: 270px;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		bottom: 0;
		height: 100%;
		overflow-y:auto;
		z-index: 2;
	}
</style>
<template>
	<div class="ask-view has-bar" v-nav="{hideNavBar:false}">
		<div class="ask-view-box">
			<device-list :devices="devices"></device-list>
			<device-info :info="info"></device-info>
		</div>
	</div>
</template>
<script>
	import deviceList from '@core/device/device-list.vue';
	import deviceInfo from '@core/device/device-info.vue';
	import { Device } from '@/services';
	let DEVICE_TIMER = null;
	export default {
		name:'index',
		components:{
			"device-list":deviceList,
			"device-info":deviceInfo
		},
		provide() {
			return {
				'rootHome': this
			}
		},
		computed:{
			deviceServer(){
				return new Device();
			}
		},
		data(){
			return{
				devices:[],
				info:{}
			}
		},
		created(){
			this.refreshDevice();
		},
		methods:{
			refreshDevice(){
				clearTimeout(DEVICE_TIMER);
				this.deviceServer.list(this.$user.auth).then(r=>{
					if(r.data.data.list.length <= 0) return;
					let _devices = [];
					_devices = r.data.data.list.map(index=>{
						if(index.device_list && index.device_list.length > 0){
							let _abnormal = false;
							index.device_list.map(sub=>{
								if(sub.open == 1 || sub.place_status == 2 || sub.dislocation_status == 2){
									_abnormal = true;
								}
							})
							index.abnormal = _abnormal;
						}
						return index;
					})
					this.devices = _devices;
					this.initInfo();
					DEVICE_TIMER = setTimeout(() => {
						this.refreshDevice();
					}, 60*1000);
				})
			},
			initInfo(){
				if(this.devices.length >0 ){
					this.devices.map(index=>{
						if(index.imei && index.imei == this.$route.params.imei){
							this.info = index;
							return;
						}else{
							if(index.device_list && index.device_list.length > 0){
								index.device_list.map(sub=>{
									if(sub.imei == this.$route.params.imei){
										this.info = sub;
										return;
									}
								});
							}
						}
					})
				}
			}
		},
		watch:{
			'$route' (to, from) {
				this.info = {};
				if(to.name == 'homeInfo'){
					this.initInfo();
				}
			}
		}
	}
</script>