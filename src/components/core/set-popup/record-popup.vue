<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.record-popup.ask-modal {
	max-width: 800px;
	width: 70%;
	padding: 0;
	border-radius: 8px;
	overflow: hidden;
	.ask-modal-header {
		padding: 8px 40px;
		background-color: map-get($color, 500);
		.ask-modal-title {
			color: map-get($color, 200);
			font-size: 1.8rem;
		}
		.ask-close-icon {
			right: 34px;
			&::before, &::after {
				background-color: rgba(map-get($color, 200), .5);
			}
			&:hover {
				&::before, &::after {
					background-color: rgba(map-get($color, 200), 1);
				}
			}
		}
	}
	.ask-modal-body {
		padding: 0;
		min-height: 241px;
	}
	.inline-loader-box .inline-loader .iconfont {
		padding: 10px 0;
		font-size: 4rem;
	}
	.soft-pro-box {
		text-align: center;
		height: 501px;
		.ul-table {
			width: 100%;
			@include flexLayout(flex, normal, center);
			border-bottom: 1px solid map-get($color, 700S4);
			li {
				padding: 8px 0;
				font-size: 1.6rem;
				color: map-get($color, A100);
			}
			.ask-col-16 {
				width: 16%;
			}
			.ask-col-28 {
				width: 28%;
			}
			&.caption {
				padding-right: 8px;
				background-color: map-get($color, 700S1);
				li {
					color: ma-get($color, 600D1);
					@include textEllipsis(1);
					font-size: 1.8rem;
				}
			}
			.ask-button.del {
				padding: 4px 16px;
				font-size: 1.6rem;
				color: map-get($color, A200);
				border: 1px solid map-get($color, A200);
				background-color: transparent;
				min-width: auto;
				border-radius: 4px;
			}
		}
		.ul-table-body {
			width: 100%;
			min-height: 200px;
			max-height: 330px;
			overflow-y: scroll;
			backface-visibility: hidden;
			.ul-table {
				li {
					padding: 12px 0;
					position: relative;
					&::after {
						content: '';
						position: absolute;
						z-index: 1;
						pointer-events: none;
						background: map-get($color, 700S1);
						width: 1px;
						left: 0;
						top: 0;
						bottom: 0;
						@media only screen and (-webkit-min-device-pixel-ratio: 2) {
							& {
								transform: scaleY(0.5) translateZ(0);
								transform-origin: 50% 0%;
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
				background-color: rgba(map-get($color, 700S3), 1);
			}
			&::-webkit-scrollbar-thumb:hover {
				background-color: rgba(map-get($color, 700S3), 1);
			}
			&::-webkit-scrollbar-thumb:active {
				background-color: rgba(map-get($color, 700S3), 1);
			}
		}
		.filter-box{
			widows: 100%;
			padding:0 20px 10px 60px;
			.filter-title{
				padding: 10px 0;
				text-align: left;
				font-size: 1.6rem;
				color: map-get($color,500);
			}
			.filter-body{
				@include flexLayout(flex,normal,center);
				padding: 10px 0 0;
				.fb-once{
					@include flexLayout(flex,normal,center);
					margin-right: 10px;
					label{
						font-size: 1.8rem;
						color: map-get($color,A100);
						margin-right: 10px;
					}
					.fb-select{
						font-size: 1.8rem;
						color: map-get($color,A100);
						min-width: 140px;
						transform: translateZ(0);
					}

				}
			}
			.filter-footer{
				width: 100%;
				.text{
					text-align: right;
					font-size: 1.4rem;
					color: map-get($color,A100);
				}
			}
		}
	}
	.null-text.small {
		font-size: 1.2rem;
	}
}

</style>
<template>
	<ask-modal :show="show" 
			   :title="title" 
			   @onclose="iconClose" 
			   @initmodal="initModal" 
			   :closeBtn="true" 
			   :transition="'soft-pro-modal'" 
			   class="record-popup">
		<div class="soft-pro-box">
			<div class="filter-box">
				<div class="filter-title">筛选</div>
				<div class="filter-body">
					<div class="fb-once">
						<label>用户</label>
						<el-select class="fb-select" v-model="filterUser" placeholder="请选择">
							<el-option v-for="(item,$i) in userOption" :key="$i" :label="item" :value="$i">
							</el-option>
						</el-select>
					</div>
					<div class="fb-once">
						<label>操作方式</label>
						<el-select class="fb-select" v-model="filterType" placeholder="请选择">
							<el-option v-for="(item,$i) in types" :key="$i" :label="item.value" :value="$i">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="filter-footer">
					<div class="text">操作记录:{{total}}条</div>
				</div>
			</div>
			<template v-if="!inlineLoaderShow || filterList.length > 0">
				<ul class="ul-table caption">
					<li class="ask-col-16">用户</li>
					<li class="ask-col-28">操作方式</li>
					<li class="ask-col-28">操作项目</li>
					<li class="ask-col-28">时间</li>
				</ul>
				<div class="ul-table-body" @scroll="onScroll($event)">
					<template v-if="filterList.length == 0">
						<div class="null-text">暂无相关数据</div>
					</template>
					<template v-for="(once,$i) in filterList">
						<ul class="ul-table">
							<li class="ask-col-16">{{once.username}}</li>
							<li class="ask-col-28">{{once.type && once.type.value}}</li>
							<li class="ask-col-28">{{once.action && once.action.value}}</li>
							<li class="ask-col-28">{{once.time}}</li>
						</ul>
					</template>
					<template v-if="!hasmore && filterList.length != 0">
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
import { askDialogConfirm, askDialogToast } from '@/utils';
import { DeviceSet } from '@/services';
import recordMixins from './record-mixins.js';
export default {
	name: "ViewTImePopup",
	components: {
		'inline-loader': inlineLoader,
	},
	mixins:[recordMixins],
	props: {
		show: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '操作记录'
		}
	},
	computed:{
		userOption(){
			let _opts = ['查看全部'],
				_json = {};
			this.list.map(index=>{
				if(!_json[index.username]){
					_opts.push(index.username);
					_json[index.username] = 1;
				}
			})
			return _opts;
		}
	},
	data() {
		return {
			inlineLoaderShow: true,
			hasmore: true,
			list: [],
			page: 1,
			total:0,
			type: "",
			username: "",
			infiniteLoading: false,
			filterUser:"",
			filterType:"",
			filterList:[],
			isChangeList: true
		}
	},
	watch:{
		filterUser(n,o){
			this.username = this.userOption[n];
			this.page = 1;
			this.filterList = [];
			if(n == 0){
				this.username = '';
				this.isChangeList = true;
			}else{
				this.isChangeList = false;
			}
			this.getRecordList();
		},
		filterType(n,o){
			//与后台约定选择“app蓝牙操作”的时候传递id为1
			this.type = this.types[n].id;

			if(this.type.length>0){
				this.type = this.type[0];
			}
			this.page = 1;
			this.filterList = [];
			if(this.type == -1){
				this.type = "";
				this.isChangeList = true;
			}else{
				this.isChangeList = false;
			}
			this.getRecordList();
		}
	},
	methods: {
		iconClose() {
			this.$emit('onclose');
		},
		initModal() {
			this.getRecordList();
		},
		getRecordList() {
			this.inlineLoaderShow = true;
			const deviceSetService = new DeviceSet();
			deviceSetService.recordList({
				"auth": this.$user.auth,
				"imei": this.$route.params.imei,
				"page": this.page,
				"type": this.type,
				"username": this.username
			}).then(r => {
				this.inlineLoaderShow = false;
				if (this.infiniteLoading) this.infiniteLoading = false;
				this.total = r.data.data.total;

				if (r.data.data.list.length <= 0) return;
				let _record = [];
				r.data.data.list.map(index => {
					let _once = {
						username: index.username,
						type: this.buildType(index.type),
						action:this.buildAction(index.act),
						time: index.created_at
					}
					if(this.isChangeList){
						this.list.push(_once);
					}
					this.filterList.push(_once);
				});
				if (!r.data.hasmore) {
					this.hasmore = false;
					return;
				}
				this.hasmore = true;
				this.page++;
			}, error => {
				this.inlineLoaderShow = false;
			})
		},
		onScroll(e) {
			if (this.infiniteLoading || !this.hasmore) {
				return;
			}
			let outerHeight = e.target.clientHeight;
			let bodyHeight = e.target.scrollHeight;
			let scrollTop = e.target.scrollTop;
			let bottom = bodyHeight - outerHeight - scrollTop;
			if (bottom < 40) this.onInfinite();
		},
		onInfinite() {
			this.inlineLoaderShow = true;
			this.infiniteLoading = true;
			this.getRecordList();
		}
	}
}

</script>
