<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.device-set {
	box-shadow: -2px 0 10px map-get($color, 800);
	.title{
		width: 100%;
		white-space: normal;
		word-break:break-all;
		padding: 14px 12px;
		font-size: 1.8rem;
		color: map-get($color,A100);
	}
	.caption{
		width: 100%;
		@include textEllipsis(1);
		padding: 10px 0;
		text-align: center;
		background-color: map-get($color,200D1);
		font-size: 1.8rem;
		color: map-get($color,A100);
	}
	.device-set-menu{
		.el-menu-item, .el-submenu__title{
			font-size: 1.8rem;
			border-bottom: 1px solid map-get($color,700S3);
		}
		.el-menu-item-group__title{
			padding: 0;
		}
		.el-submenu .el-menu{
			background-color: map-get($color,200D1);
		}
		.ds-list{
			width: 100%;
			.ds-once{
				min-height: 45px;
				width: 100%;
				padding: 4px 10px 4px 40px;
				border-bottom: 1px solid map-get($color,200);
				@include flexLayout(flex,justify,center);
				&.is-click{
					cursor: pointer;
					&.active,
					&:hover{
						transition:color .3s ease;
						color: map-get($color,500);
					}
				}
				.ds-otitle{
					font-size: 1.8rem;
				}
				.ds-oinfo{
					.check-label{
						min-width: 34px;
						text-align: right;
					}
					.ask-button.info,
					.ask-button.info a{
						color: map-get($color,500S2);
						text-decoration: none;
					}
					.ask-button{
						min-width: auto;
						padding: 0;
						a{
							display: block;
							width: 40px;
							height: 36px;
							text-align: center;
							line-height: 36px;
							.iconfont{
								display: inline-block;
								font-size: 1.8rem;
							}
							&:hover{
								.iconfont{
									color: map-get($nav,logo);
									transform: scale(1.2);
									transition: transform  .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
								}
							}
						}
					}
				}
			}
		}
	}
}


/* 进入过渡的状态 */
.soft-pro-modal-enter-active{
	transform-origin: 50% 100%;
    animation: soft-pro-modal-enter .3s ease 1 both;
}
@keyframes soft-pro-modal-enter{
	0%{
		transform: translate3d(50%,-50%,0) skewX(30deg);
		opacity: 0;
	}
	80%{
		opacity: 1;
	}
	100%{
		transform: translate3d(-50%,-50%,0) skewX(0deg);
		opacity: 1;
	}
}
/* 离开过渡的状态 */
.soft-pro-modal-leave-active{
	transform-origin: 50% 100%;
    animation: soft-pro-modal-leave .3s cubic-bezier(1.0, 0.5, 0.8, 1.0) 1 both;
}
@keyframes soft-pro-modal-leave{
	0%{
		transform: translate3d(-50%,-50%,0) skewX(0deg);
		opacity: 1;
	}
	80%{
		opacity: 1;
	}
	100%{
		transform: translate3d(-150%,-50%,0) skewX(-30deg);
		opacity: 0;
	}
}

/* 进入过渡的状态 */
.soft-pro-modal-fly-enter-active{
	transform-origin: 50% 100%;
    animation: soft-pro-modal-fly-enter .3s ease 1 both;
}
@keyframes soft-pro-modal-fly-enter{
	0%{
		transform: translate3d(100%,0,0) skewX(30deg);
		opacity: 0;
	}
	80%{
		opacity: 1;
	}
	100%{
		transform: translate3d(0,0,0) skewX(0deg);
		opacity: 1;
	}
}
/* 离开过渡的状态 */
.soft-pro-modal-fly-leave-active{
	transform-origin: 50% 100%;
    animation: soft-pro-modal-fly-leave .3s cubic-bezier(1.0, 0.5, 0.8, 1.0) 1 both;
}
@keyframes soft-pro-modal-fly-leave{
	0%{
		transform: translate3d(0,0,0) skewX(0deg);
		opacity: 1;
	}
	80%{
		opacity: 1;
	}
	100%{
		transform: translate3d(-100%,0,0) skewX(-30deg);
		opacity: 0;
	}
}
</style>
<template>
	<div class="device-set">
		<div class="title">安全箱:"{{info.name}}"</div>
		<div class="caption">操作栏</div>
		<el-menu class="device-set-menu" 
				@open="handleOpen" 
				@close="handleClose"
				:active-text-color="'#333'"
				:unique-opened="true">
			<el-submenu index="1">
				<template slot="title">
					<span>锁定设置</span>
				</template>
				<el-menu-item-group>
					<ul class="ds-list">
						<el-tooltip content="时间范围内无法开箱" placement="left" :enterable="false">
							<li class="ds-once">
								<div class="ds-otitle">时间锁定</div>
								<div class="ds-oinfo">
									<!-- <ask-button>
										<a href="javascript:void(0);" title="添加">
											<i class="iconfont icon-add"></i>
										</a>
									</ask-button>
									<ask-button>
										<a href="javascript:void(0);" title="查看">
											<i class="iconfont icon-view"></i>
										</a>
									</ask-button> -->
									<ask-button class="info" @ask-click="onAddTime">
										<a href="javascript:void(0);" title="添加">
											添加
										</a>
									</ask-button>
									<ask-button class="info" @ask-click="onViewTime">
										<a href="javascript:void(0);" title="查看">
											查看
										</a>
									</ask-button>
								</div>
							</li>
						</el-tooltip>
						<el-tooltip content="区域范围内可以开箱" placement="left" :enterable="false">
							<li class="ds-once">
								<div class="ds-otitle">区域锁定</div>
								<div class="ds-oinfo">
									<ask-button class="info" @ask-click="onAddArea">
										<a href="javascript:void(0);" title="添加">
											添加
										</a>
									</ask-button>
									<ask-button class="info" @ask-click="onViewArea">
										<a href="javascript:void(0);" title="查看">
											查看
										</a>
									</ask-button>
								</div>
							</li>
						</el-tooltip>
						<el-tooltip content="锁定开启，无法开箱" placement="left" :enterable="false">
							<li class="ds-once">
								<div class="ds-otitle">手动锁定</div>
								<div class="ds-oinfo">
									<inline-loader v-show="inlineLoaderShow"></inline-loader>
									<check-card 
										:check="isManualLock" 
										v-show="!inlineLoaderShow"
										@input-change="setManualLock">
										<template slot="label">
											{{isManualLock?"开":"关"}}
										</template>
									</check-card>
								</div>
							</li>
						</el-tooltip>
					</ul>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<span>远程授权</span>
				</template>
				<el-menu-item-group>
					<ul class="ds-list">
						<el-tooltip content="开启10分钟后自动关闭" placement="left" :enterable="false">
							<li class="ds-once">
								<div class="ds-otitle">开关</div>
								<div class="ds-oinfo">
									<inline-loader v-show="inlineLoaderShow"></inline-loader>
									<check-card 
										:check="isRemoteAuth" 
										@input-change="setRemoteAuth" 
										v-show="!inlineLoaderShow" >
										<template slot="label">
											{{isRemoteAuth?"开":"关"}}
										</template>
									</check-card>
								</div>
							</li>
						</el-tooltip>
					</ul>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<span>设置</span>
				</template>
				<el-menu-item-group>
					<ul class="ds-list">
						<li class="ds-once">
							<div class="ds-otitle">位置报送间隔</div>
							<div class="ds-oinfo">
								<inline-loader v-show="inlineLoaderShow"></inline-loader>
								<grade-card 
									:grade="positionInterval" 
									@grade-change="setPositionInterval" 
									v-show="!inlineLoaderShow" >
								</grade-card>
							</div>
						</li>
						<li class="ds-once">
							<div class="ds-otitle">报警报送间隔</div>
							<div class="ds-oinfo">
								<inline-loader v-show="inlineLoaderShow"></inline-loader>
								<grade-card 
									:grade="policeInterval" 
									@grade-change="setPoliceInterval" 
									v-show="!inlineLoaderShow" >
								</grade-card>
							</div>
						</li>
					</ul>
				</el-menu-item-group>
			</el-submenu>
			<template v-if="$isPro">
				<el-submenu index="4">
					<template slot="title">
						<span>管理人</span>
					</template>
					<el-menu-item-group>
						<ul class="ds-list">
							<li class="ds-once is-click" :class="{'active':userInfoActive == 1}" @click="onOnceClick(1)">
								<div class="ds-otitle">管理人信息</div>
							</li>
							<li class="ds-once is-click" :class="{'active':userInfoActive == 2}" @click="onOnceClick(2)">
								<div class="ds-otitle">添加用户</div>
							</li>
						</ul>
					</el-menu-item-group>
				</el-submenu>
			</template>
			<template v-else>
				<el-menu-item index="4" @click="onOnceClick(1)">
			        <span slot="title">管理人</span>
		        </el-menu-item>
			</template>
			<el-menu-item index="5" @click="clickRecord">
		        <span slot="title">操作记录</span>
	        </el-menu-item>
	        <el-submenu index="6">
	        	<template slot="title">
	        		<span>物品管理</span>
	        	</template>
	        	<el-menu-item-group>
	        		<ul class="ds-list">
	        			<li class="ds-once">
	        				<div class="ds-otitle">物品信息</div>
	        				<div class="ds-oinfo">
	        					<ask-button class="info" @click.native="onViewBoxList">
	        						<a href="javascript:void(0);" title="查看">
	        							查看
	        						</a>
	        					</ask-button>
	        				</div>
	        			</li>
	        			<li class="ds-once">
	        				<div class="ds-otitle">物品记录</div>
	        				<div class="ds-oinfo">
	        					<ask-button class="info" @ask-click="onViewBoxHis">
	        						<a href="javascript:void(0);" title="查看">
	        							查看
	        						</a>
	        					</ask-button>
	        				</div>
	        			</li>
	        		</ul>
	        	</el-menu-item-group>
	        </el-submenu>
		</el-menu>
	</div>
</template>
<script>
import checkCard from '../check-card/check-card.vue';
import gradeCard from '../grade-card/grade-card.vue';
import inlineLoader from '../inline-loader/inline-loader.vue';
import { 
	viewTimePopup,
	addTimePopup,
	viewAreaPopup,
	addAreaPopup,
	recordPopup,
	viewUserInfoPopup,
	addUserInfoPopup,
	viewBoxListPopup,
	viewBoxHisPopup
} from '../set-popup';

import { DeviceSet,Device } from '@/services';
import {askDialogToast,merge} from '@/utils';
export default {
	name: "DeviceSet",
	props: ['info'],
	inject:['rootMain','rootHome'],
	components:{
		'check-card':checkCard,
		'grade-card':gradeCard,
		'inline-loader':inlineLoader,
	},
	data(){
		return{
			modalShow:false,
			userInfoActive: 0,
			inlineLoaderShow: true,
			isManualLock: false, //手动锁定
			isRemoteAuth:false,  //远程授权
			positionInterval: [], //位置报送间隔
			policeInterval: [], //报警报送间隔
			deviceSetService: new DeviceSet(),
			deviceService: new Device(),
			menuKey: null
		}
	},
	watch:{
		info(n,o){
			if(this.menuKey != null){
				this.handleOpen(this.menuKey)
			}
		}
	},
	methods:{
		handleOpen(key,keyPath){
			this.inlineLoaderShow = true;
			this.menuKey = key;
			if(key == 1){
				this.initManualLock();
			}
			if(key == 2){
				this.initRemoteAuth()
			}
			if(key == 3){
				this.initStageSet();
			}
		},
		handleClose(){
			this.userInfoActive = 0;
		},
		initManualLock(){
			this.deviceService.getSetInfo({
				auth: this.$user.auth,
				imei: this.$route.params.imei
			}).then(r=>{
				setTimeout(() => {
					if(!r.data.data) {
						askDialogToast({msg:r.data.message? r.data.message:`数据缺失`,time:2000,class:'danger'});
						return;
					}
				 	this.inlineLoaderShow = false;
				 	this.isManualLock = r.data.data.lock_man == 1 ? true : false;
				}, 500);
			})
		},
		initRemoteAuth(){
			this.deviceService.getSetInfo({
				auth: this.$user.auth,
				imei: this.$route.params.imei
			}).then(r=>{
				setTimeout(() => {
					if(!r.data.data) {
						askDialogToast({msg:r.data.message? r.data.message:`数据缺失`,time:2000,class:'danger'});
						return;
					}
					this.inlineLoaderShow = false;
					this.isRemoteAuth = r.data.data.authorize == 1 ? true : false;
				}, 500);
			})
		},
		initStageSet(){
			this.deviceService.getSetInfo({
				auth: this.$user.auth,
				imei: this.$route.params.imei
			}).then(r=>{
				setTimeout(() => {
					if(!r.data.data) {
						askDialogToast({msg:r.data.message? r.data.message:`数据缺失`,time:2000,class:'danger'});
						return;
					}
					this.inlineLoaderShow = false;
					this.positionInterval = this.buildInterval(r.data.data.set01,'position');
					this.policeInterval = this.buildInterval(r.data.data.set02);
				}, 500);
			})
		},
		setManualLock(check){
			this.rootMain.loader(true);
			this.deviceSetService.setManualLock({
				auth: this.$user.auth,
				imei: this.$route.params.imei
			}).then(r=>{
				this.rootMain.loader(false);
				if(r.data.code != 1000){
					askDialogToast({msg:r.data.message? r.data.message:`设置失败`,time:2000,class:'danger'});
					return;
				}
				if(r.data.code == 1000){
					this.rootHome.refreshDevice();
					this.isManualLock = check;
					askDialogToast({msg:r.data.message? r.data.message:'设置成功',time:2000,class:'success'});
				}
			},error=>{
				this.rootMain.loader(false);
			})
		},
		setRemoteAuth(check){
			this.rootMain.loader(true);
			this.deviceSetService.setRemoteAuth({
				auth: this.$user.auth,
				imei: this.$route.params.imei
			}).then(r=>{
				this.rootMain.loader(false);
				if(r.data.code != 1000){
					askDialogToast({msg:r.data.message? r.data.message:`设置失败`,time:2000,class:'danger'});
					return;
				}
				if(r.data.code == 1000){
					this.rootHome.refreshDevice();
					this.isRemoteAuth = check;
					askDialogToast({msg:r.data.message? r.data.message:'设置成功',time:2000,class:'success'});
				}
			},error=>{
				this.rootMain.loader(false);
			})
		},
		setPositionInterval(grade,index){

			this.rootMain.loader(true);
			this.deviceSetService.setIntervalInfo({
				auth: this.$user.auth,
				imei: this.$route.params.imei,
				pos: grade.value,
				pol: this.policeInterval.filter(index=>index.checked)[0].value
			}).then(r=>{
				this.rootMain.loader(false);
				if(r.data.code != 1000){
					askDialogToast({msg:r.data.message? r.data.message:`设置失败`,time:2000,class:'danger'});
					return;
				}
				if(r.data.code == 1000){
					this.positionInterval = this.positionInterval.map(index=>{
						if(index.value == grade.value){
							index.checked = true;
						}else{
							index.checked = false;
						}
						return index;
					});
					askDialogToast({msg:r.data.message? r.data.message:'设置成功',time:2000,class:'success'});
				}
			},error=>{
				this.rootMain.loader(false);
			})
		},
		setPoliceInterval(grade,index){
			this.rootMain.loader(true);
			this.deviceSetService.setIntervalInfo({
				auth: this.$user.auth,
				imei: this.$route.params.imei,
				pos: this.positionInterval.filter(index=>index.checked)[0].value,
				pol: grade.value
			}).then(r=>{
				this.rootMain.loader(false);
				if(r.data.code != 1000){
					askDialogToast({msg:r.data.message? r.data.message:`设置失败`,time:2000,class:'danger'});
					return;
				}
				if(r.data.code == 1000){
					this.policeInterval = this.policeInterval.map(index=>{
						if(index.value == grade.value){
							index.checked = true;
						}else{
							index.checked = false;
						}
						return index;
					})
					askDialogToast({msg:r.data.message? r.data.message:'设置成功',time:2000,class:'success'});
				}
			},error=>{
				this.rootMain.loader(false);
			})
		},
		buildInterval(val,type){
			let item = [{
					name: '低',
					value: '03',
					tip:"2分钟",
					checked: false
				},
				{
					name: '中',
					value: '02',
					tip:"5分钟",
					checked: false
				},
				{
					name: '高',
					value: '01',
					tip:"10分钟",
					checked: false
				}
			];
			item = item.map((index,key)=>{
				if(index.value == val) index.checked = true;
				if(type == 'position'){
					if(key == 0) index.tip = "5分钟";
					if(key == 1) index.tip = "30分钟";
					if(key == 2) index.tip = "1小时";
				}
				return index;
			})
			return item;
		},
		onViewTime(){
			viewTimePopup((vm)=>{
				// console.log(vm)
			})
		},
		onAddTime(){
			addTimePopup((vm)=>{
				//close
			})
		},
		onViewArea(){
			viewAreaPopup((vm)=>{
				// console.log(vm)
			})
		},
		onAddArea(){
			addAreaPopup((vm)=>{
				//close
			})
		},
		onOnceClick(type){
			if(type==1){
				this.userInfoActive = 1;
				viewUserInfoPopup((vm)=>{
					//close
					this.userInfoActive = 0;
				})
			}
			if(type==2){
				this.userInfoActive = 2;
				addUserInfoPopup((vm)=>{
					//close
					this.userInfoActive = 0;
				})
			}
		},
		clickRecord(){
			this.userInfoActive = 0;
			recordPopup((vm)=>{
				//close
			})
		},
		onViewBoxList(){
			viewBoxListPopup((vm)=>{

			})
		},
		onViewBoxHis(){
			viewBoxHisPopup((vm)=>{

			})
		}
	}
}

</script>
