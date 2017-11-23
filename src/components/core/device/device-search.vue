<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.device-search{
		width: 100%;
		.search-box{
			width: 100%;
			height: 70px;
			@include flexLayout(flex,justify,center);
			padding: 20px 12px;
			input{
				flex: 1 0 auto;
				border:none;
				outline: none;
				height: 30px;
				line-height: 30px;
				font-size: 1.4rem;
				color: map-get($color,600);
				border-radius: 4px 0 0 4px;
				background-color: map-get($color,200);
				padding: 4px 10px;
			}
			.ask-button{
				height: 30px;
				padding: 0 16px;
				background-color: map-get($color,500S2);
				color: map-get($color,200);
				min-width: auto;
				border-radius: 0 4px 4px 0;
			}
		}
		.search-body{
			position: absolute;
			top: 70px;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 3;
			pointer-events: none;
			background-color: transparent;
			overflow: hidden;
			.search-result{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				pointer-events: auto;
				background-color: #fff;
				overflow-x: hidden; 
				overflow-y: auto; 
				&::-webkit-scrollbar {
					width: 4px;
					background-color: transparent;
				}
				&::-webkit-scrollbar-track {
					border-radius: 0;
					background-color: rgba(map-get($scrollbar, 500), 1);
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 4px;
					background-color: rgba(map-get($scrollbar, 200), .6);
				}
				&::-webkit-scrollbar-thumb:hover {
					background-color: rgba(map-get($scrollbar, 200), .8);
				}
				&::-webkit-scrollbar-thumb:active {
					background-color: rgba(map-get($scrollbar, 200), 1);
				}
				.sb-close{
					width: 100%;
					.ask-button{
						width: 100%;
						min-width: auto;
						background-color: rgba(map-get($color,500),.8);
						border-radius: 0;
						color: map-get($color,200);
					}
				}
				.list{
					width: 100%;
					.center{
						text-align: center;
						padding: 12px 4px;
					}
					.text-unlimited{
						overflow: auto;
						white-space: normal;
						text-overflow: initial;
					}
					&>li{
						width: 100%;
						font-size: 1.6rem;
						border-bottom: 1px solid map-get($color,600);
						@include textEllipsis(1);
						color: map-get($color,700);
						.ask-button{
							min-width: auto;
							width: 100%;
							text-align: left;
							text-transform:none;
							&:disabled{
								background-color: map-get($color,600);

							}
						}
					}
				}
			}
		}
		
		.search-body-trigger-enter-active{
			animation: search-body-trigger-enter .3s ease 1 both;
			overflow: hidden;
		}
		@keyframes search-body-trigger-enter{
			0%{
				transform: translateY(-50%);
			}
			100%{
				transform: translateY(0);
			}
		}
		/* 离开过渡的状态 */
		.search-body-trigger-leave-active{
	        animation: search-body-trigger-leave .3s cubic-bezier(1.0, 0.5, 0.8, 1.0) 1 both;
			overflow: hidden;
		}
		@keyframes search-body-trigger-leave{
			0%{
				transform: translateY(0);
			}
			100%{
				transform: translateY(-50%);
			}
		}
	}
</style>
<template>
	<div class="device-search">
		<div class="search-box">
			<input 
				type="text" 
				placeholder="搜索设备"
				v-model="search"
				v-validate="'required'"
				@keyup.enter="onClick"
				name="search"
				:class="{error: errors.has('search')}"
				@input="onInput"
				>
			<ask-button @ask-click="onClick">
				<i class="iconfont icon-sousuo"></i>
			</ask-button>
		</div>
		<div class="search-body">
			<transition name="search-body-trigger">
				<div class="search-result"  v-show="bodyShow">
					<div class="sb-close">
						<ask-button @ask-click="onCloseClick">close</ask-button>
					</div>
					<ul class="list">
						<template v-if="search == ''">
							<li class="center">请输入设备名</li>
						</template>
						<template v-if="search != '' && list.length <= 0 && msg">
							<li class="center text-unlimited">暂无“{{search}}”的相关数据</li>
						</template>
						<template v-if="list.length > 0">
							<template v-for="(once,$i) in list">
								<li :key="$i">
									<ask-button @ask-click="onListClick(once)" :disabled="once.imei == $route.params.imei">
										{{once.name}}
									</ask-button>
								</li>
							</template>
						</template>
					</ul>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
	import { askDialogToast } from '@/utils'
	import { Device } from '@/services';
	export default{
		name:"DeviceSearch",
		inject:['rootMain'],
		data(){
			return{
				search:'',
				bodyShow: false,
				list:[],
				msg: false
			}
		},
		methods:{
			onInput(){
				this.msg = false;
			},
			onClick(){
				this.msg=false;
				this.bodyShow = true;
				this.$validator.validateAll().then((result, r) => {
					if (result) {
						const deviceServer = new Device();
						this.rootMain.loader(true);
						deviceServer.search({
							auth: this.$user.auth,
							search: this.search
						}).then(r=>{
							this.rootMain.loader(false);
							this.msg=true;
							let _devices = [];
							_devices = r.data.data.list.map(index=>index);
							this.list = _devices;
						},error=>{
							this.rootMain.loader(false);
							this.msg=true;
						})
						return;
					}
					askDialogToast({
						msg: '请输入设备名',
						time: 2000,
						position: 'top-center',
						class: 'danger'
					});
				})
			},
			onCloseClick(){
				this.bodyShow = false;
				this.list = [];
				this.search = '';
				this.msg = false;
			},
			onListClick(once){
				this.bodyShow = false;
				this.search = '';
				this.list = [];
				this.msg = false;
				this.$router.push({ path: `/home/${once.imei}`});
			}
		}
	}
</script>