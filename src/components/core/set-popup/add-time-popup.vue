<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.add-time-popup.ask-modal{
		width: 550px;
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
			width: 100%;
			.group-out{
				width: 100%;
				padding: 0 10%;
				.group{
					@include flexLayout(flex,normal,center);
					padding: 20px 0;
					border-bottom: 2px dashed map-get($color,700S4);
					label{
						width: 100px;
						font-size: 1.8rem;
						color: map-get($color,A100);
					}
					.g-input{
						padding: 6px 12px;
						border: 1px solid map-get($color,700S4);
						border-radius: 4px;
						color: map-get($color,A100);
						font-size: 1.8rem;
						width: calc(100% - 100px);
						outline: none;
						&.error{
							border: 1px solid map-get($color,A200);
						}
						&:focus{
							border: 1px solid map-get($color,500);
						}
					}
				}
			}
			.button-group{
				width: 100%;
				text-align: center;
				padding: 20px 0;
				.ask-button.add{
					min-width: auto;
					color: map-get($color,200);
					background-color: map-get($color,500);
					font-size: 1.6rem;
					width: 50%;
					padding: 0;
					height: 40px;
					border-radius: 4px;
					.inline-loader-box{
						.inline-loader{
							min-width: auto;
							.iconfont{
								color:  map-get($color,200);
								font-size: 2.2rem;
							}
						}
					}
				}
			}
		}
	}
</style>
<template>
	<ask-modal  :show="show" 
				:title="title"
				@onclose="iconClose"
				:closeBtn ="true"
				:transition="'soft-pro-modal'"
				class="add-time-popup">
		<div class="soft-pro-box">
			<form @submit.prevent="saveTime" >
				<div class="group-out">
					<div class="group">
						<label>锁定名称</label>
						<input type="text" 
							   placeholder="请输入名称" 
							   v-model="model.name"
							   v-validate="'required'"
							   name="name"
							   class="g-input" 
							   :class="{error: errors.has('name')}">
					</div>
					<div class="group">
						<label>开始时间</label>
						<input-time :time="model.start" @select="startChange"></input-time>
					</div>
					<div class="group">
						<label>结束时间</label>
						<input-time :time="model.end" @select="endChange"></input-time>
					</div>
				</div>
				<div class="button-group">
					<ask-button :type="'submit'" class="add" :disabled="inlineLoaderShow">
						确定<inline-loader v-show="inlineLoaderShow"></inline-loader>
					</ask-button>
				</div>
			</form>
		</div>
	</ask-modal>
</template>
<script>
import inlineLoader from '../inline-loader/inline-loader.vue';
import inputTime from '../input-time/input-time.vue';
import { askDialogConfirm,askDialogToast } from '@/utils';
import moment from 'moment/moment.js';
import { DeviceSet } from '@/services';
	export default{
		name:"ViewTImePopup",
		components:{
			'inline-loader':inlineLoader,
			'input-time':inputTime,
		},
		props:{
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '时间锁定添加'
			}
		},
		data(){
			return{
				inlineLoaderShow: false,
				model:{
					name:'',
					start:'2017-11-30 11:11:11',
					end:'2017-11-23 11:11:11',
				}
			}
		},
		methods:{
			iconClose(){
				if(this.inlineLoaderShow) return;
				this.$emit('onclose');
			},
			startChange(time){
				this.model.start = time;
			},
			endChange(time){
				this.model.end = time;
			},
			saveTime(){
				this.$validator.validateAll().then((result) => {
			        if (result) {
			        	this.inlineLoaderShow = true;
			        	const deviceSetServer = new DeviceSet();
			        	deviceSetServer.addLockTime({
			        		start:moment(this.model.start).unix(),
			        		end: moment(this.model.end).unix(),
			        		name: this.model.name,
			        		auth: this.$user.auth,
			        		imei: this.$route.params.imei
			        	}).then(r=>{
			        		this.inlineLoaderShow = false;
			        		
			        		if(r.data.code != 1000) {
			        			askDialogToast({msg:r.data.message? r.data.message:`"${this.model.name}"添加失败`,time:2000,class:'danger'});
			        			return;
			        		}
			        		if(r.data.code == 1000){
			        			askDialogToast({msg:r.data.message? r.data.message:`"${this.model.name}"添加成功`,time:2000,class:'success'});
			        		}
			        		this.$emit('onclose');
			        	},error=>{
			        		this.inlineLoaderShow = false;
			        	})
			            // this.$emit('save-product', this.model);
			            return;
			        }
			        askDialogToast({msg:"请输入名称",time:2000,class:"danger"});
			    });
			}
		}
	}
</script>