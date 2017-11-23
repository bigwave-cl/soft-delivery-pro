<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.view-user-info-popup.ask-modal{
		max-width: 800px;
		width: 70%;
		padding: 0;
		border-radius: 8px;
		overflow: hidden;
		.ask-modal-header{
			padding: 8px 40px;
			background-color: map-get($color,500);
			.ask-modal-title{
				color: map-get($color,200);
				font-size: 1.8rem;
			}
			.ask-close-icon{
				right: 34px;
				&::before, &::after{
					background-color: rgba(map-get($color,200),.5);
				}
				&:hover{
					&::before, &::after{
						background-color: rgba(map-get($color,200),1);
					}
				}
			}
		}
		.ask-modal-body{
			padding: 0;
			min-height: 241px;
		}
		.inline-loader-box .inline-loader .iconfont{
			padding: 10px 0;
			font-size: 4rem;
		}
		.soft-pro-box{
			text-align: center;
			height: 401px;
			.ul-table{
				width: 100%;
				@include flexLayout(flex,normal,center);
				border-bottom: 1px solid map-get($color,700S4);
				li{
					padding: 8px 0;
					font-size: 1.6rem;
					color: map-get($color,A100);
				}
				.ask-col-45{
					width: 45%;
				}
				.ask-col-35{
					width: 35%;
				}
				.ask-col-20{
					width: 20%;
				}
				&.caption{
					padding-right: 8px;
					background-color: map-get($color,700S1);
					li{
						color: ma-get($color,600D1);
						@include textEllipsis(1);
						font-size: 1.8rem;
					}
				}
				.ask-button.del{
					padding: 4px 16px;
					font-size: 1.6rem;
					color: map-get($color,A200);
					border: 1px solid map-get($color,A200);
					background-color: transparent;
					min-width: auto;
					border-radius: 4px;
				}
			}
			.ul-table-body{
				width: 100%;
				min-height: 200px;
				max-height: 350px;
				overflow-y: scroll;
				.ul-table{
					li{
						padding: 12px 0;
						position: relative;
						&::after {
						    content: '';
						    position: absolute;
						    z-index: 1;
						    pointer-events: none;
						    background: map-get($color,700S1);
						    width: 1px;
						    left: 0;
						    top: 0;
						    bottom: 0;
						    @media only screen and (-webkit-min-device-pixel-ratio:2) {
						        &{
						            -webkit-transform: scaleY(0.5);
						            -webkit-transform-origin: 50% 0%;
						        }
						    }
						}
					}
				}
				&::-webkit-scrollbar {
					width: 8px;
					background-color: transparent;
				}
				&::-webkit-scrollbar-track {
					border-radius: 0;
					background-color: rgba(map-get($color, 700S1), 1);
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 4px;
					background-color: rgba(map-get($color,700S3), 1);
				}
				&::-webkit-scrollbar-thumb:hover {
					background-color: rgba(map-get($color,700S3), 1);
				}
				&::-webkit-scrollbar-thumb:active {
					background-color: rgba(map-get($color,700S3), 1);
				}
			}
		}
		.null-text.small{
			font-size: 1.2rem;
		}
	}
</style>
<template>
	<ask-modal  :show="show" 
				:title="title"
				@onclose="iconClose"
				@initmodal="initModal"
				:closeBtn ="true"
				:transition="'soft-pro-modal'"
				class="view-user-info-popup">
		<div class="soft-pro-box">
			<template v-if="!inlineLoaderShow || list.length > 0">
				<ul class="ul-table caption">
					<li class="ask-col-45">管理人名称</li>
					<li class="ask-col-35">用户类型</li>
					<li class="ask-col-20">操作</li>
				</ul>
				<div class="ul-table-body" @scroll="onScroll($event)">
					<template v-if="list.length == 0"><div class="null-text">暂无相关数据</div></template>
					<template v-for="(once,$i) in list">
						<ul class="ul-table">
							<li class="ask-col-45">{{once.username || '无'}}</li>
							<li class="ask-col-35">{{once.group_name || '无'}}</li>
							<li class="ask-col-20">
								<ask-button class="del" @ask-click="onDel(once)">解除</ask-button>
							</li>
						</ul>
					</template>
					<template v-if="!hasmore && list.length != 0">
						<div class="null-text small">全部数据加载完成</div>
					</template>
				</div>
			</template>
			<inline-loader v-show="inlineLoaderShow"></inline-loader>
		</div>
	</ask-modal>
</template>
<script>
import inlineLoader from '../inline-loader/inline-loader.vue';
import { askDialogConfirm,askDialogToast } from '@/utils';
import { DeviceSet } from '@/services';
	export default{
		name:"ViewTImePopup",
		components:{
			'inline-loader':inlineLoader,
		},
		props:{
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '管理人信息'
			}
		},
		data(){
			return{
				inlineLoaderShow: true,
				hasmore: true,
				list:[],
				page: 1,
				infiniteLoading:false
			}
		},
		methods:{
			iconClose(){
				this.$emit('onclose');
			},
			initModal(){
				this.getUserInfoList();
			},
			getUserInfoList(pageNoAdd){
				this.inlineLoaderShow = true;
				const deviceSetService = new DeviceSet();
				deviceSetService.userInfoList({
					"auth": this.$user.auth,
					"imei" : this.$route.params.imei,
					"page" : this.page
				}).then(r=>{
					this.inlineLoaderShow = false;
					if(this.infiniteLoading) this.infiniteLoading = false;
					if(r.data.data.list.length <= 0) return;
					r.data.data.list.map(index=>{
						this.list.push(index);
					});
					if(!r.data.hasmore) {
						this.hasmore = false;
						return;
					}
					this.hasmore = true;
					if(pageNoAdd) return;
					this.page++;
				},error=>{
					this.inlineLoaderShow = false;
				})
			},
			onDel(once){
				askDialogConfirm({
					title: '解除管理人',
					msg: `确定解除${once.group_name}"${once.username}"？`
				}, (vm) => {
				  	const deviceSetService = new DeviceSet();
				  	deviceSetService.delUserInfo({
						"auth": this.$user.auth,
						"id":once.id
				  	}).then(r=>{
				  		setTimeout(() => {
				  			vm.close();
				  			if(r.data.code != 1000) {
				  				askDialogToast({msg:r.data.message? r.data.message:`"${once.username}"解除失败`,time:2000,class:'danger'});
				  				return;
				  			}
				  			let _index = this.list.findIndex(index=>index.id == once.id);
				  			this.list.splice( _index, 1);
				  			if(r.data.code == 1000){
				  				askDialogToast({msg:r.data.message? r.data.message:`"${once.username}"解除成功`,time:2000,class:'success'});
				  			}
				  			this.$nextTick(()=>{
				  				let tableBody = this.$el.querySelector('.ul-table-body');
				  				if(tableBody.scrollHeight ==  tableBody.clientHeight){
				  					this.list = [];
				  					this.page--;
				  					if(this.page < 1){
				  						this.page=1;
				  					}
				  					this.getUserInfoList(true);
				  				}
				  			})
				  		}, 500)
				  	})
				});
			},
			onScroll(e){
				if (this.infiniteLoading || !this.hasmore) {
					return;
				}
				let outerHeight = e.target.clientHeight;
				let bodyHeight = e.target.scrollHeight;
				let scrollTop = e.target.scrollTop;
				let bottom = bodyHeight - outerHeight - scrollTop;
				if (bottom < 40) this.onInfinite();
			},
			onInfinite(){
				this.inlineLoaderShow = true;
				this.infiniteLoading = true;
				this.getUserInfoList();
			}
		}
	}
</script>