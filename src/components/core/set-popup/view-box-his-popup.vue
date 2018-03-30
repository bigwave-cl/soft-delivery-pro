<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.view-box-his-popup.ask-modal-box{
		.ask-modal-wrapper{
			max-width: 800px;
			min-width: 550px;
			width: 70%;
			padding: 0;
			border-radius: 8px;
			overflow: hidden;
		}
		.ask-modal-header{
			padding: 8px 40px;
			background-color: map-get($color,500);
			.ask-modal-title{
				color: map-get($color,200);
				font-size: 1.8rem;
			}
			.ask-close-icon{
				right: 8px;
				.icon{
					&::after,
					&::before{
						background-color: rgba(map-get($color,200),.5);
					}
					&:hover::after,
					&:hover::before{
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
				.ask-col-30{
					width: 30%;
				}
				.ask-col-40{
					width: 40%;
				}
				&.caption{
					padding-right: 8px;
					background-color: map-get($color,700S1);
					li{
						color: map-get($color,600D1);
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
	<ask-modal 
		:title="title" 
		:show.sync="show"
		:beforeClose="beforeClose"
		@open="initModal"
		:showFooter="false"
		class="view-box-his-popup"
		>
		<div class="soft-pro-box">
			<template v-if="!inlineLoaderShow || list.length > 0">
				<ul class="ul-table caption">
					<li class="ask-col-30">物品编号</li>
					<li class="ask-col-30">物品状态</li>
					<li class="ask-col-40">时间</li>
				</ul>
				<div class="ul-table-body" @scroll="onScroll($event)">
					<template v-if="list.length == 0"><div class="null-text">暂无相关数据</div></template>
					<template v-for="(once,$i) in list">
						<ul class="ul-table">
							<li class="ask-col-30">{{once.name || '无'}}</li>
							<li class="ask-col-30">{{once.state || '无'}}</li>
							<li class="ask-col-40">{{once.time || '无'}}</li>
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
import { askDialogToast } from '@/utils';
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
				default: '物品记录'
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
			beforeClose(){
				this.$emit('onclose');
			},
			initModal(){
				this.getBoxHis();
			},
			getBoxHis(){
				this.inlineLoaderShow = true;
				const deviceSetService = new DeviceSet();
				deviceSetService.boxHis({
					"auth": this.$user.auth,
					"imei" : this.$route.params.imei,
					"page" : this.page
				}).then(r=>{
					this.inlineLoaderShow = false;
					if(this.infiniteLoading) this.infiniteLoading = false;
					if(r.data.data.list.length <= 0) return;
					r.data.data.list.map(index=>{
						let _once = {
							name: index.name,
							flag: index.flag,
							state: this.buildState(index.flag),
							time: index.time
						}
						this.list.push(_once);
					});
					if(!r.data.hasmore) {
						this.hasmore = false;
						return;
					}
					this.hasmore = true;
					this.page++;
				},error=>{
					this.inlineLoaderShow = false;
				})
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
				this.getBoxHis();
			},
			buildState(flag){
				let tagName = '';
				switch (flag) {
					case 'in':
						tagName = '进箱';
						break;
					case 'out':
						tagName = '出箱';
						break;
					case 'lost':
						tagName = '丢失';
						break;
					default:
						tagName = '未知';
						// statements_def
						break;
				}
				return tagName;
			}
		}
	}
</script>