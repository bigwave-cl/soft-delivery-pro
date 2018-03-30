<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.add-user-info-popup.ask-modal-box{
		.ask-modal-wrapper{
			width: 550px;
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
			width: 100%;
			.group-out{
				width: 100%;
				padding: 0 10%;
				.group{
					@include flexLayout(flex,normal,center);
					padding: 20px 0;
					border-bottom: 2px dashed map-get($color,700S4);
					position: relative;
					.tip{
						position: absolute;
						bottom: 0;
						left: 100px;
						right: 0;
						color: map-get($color,A200);
						font-size: 1.2rem;
					}
					.small-tip{
						color: map-get($color,700);
						font-size: 1.2rem;
						margin-left: 10px;
					}
					.g-label{
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
							&.error{
								border: 1px solid map-get($color,A200);
							}
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
		:showFooter="false"
		class="add-user-info-popup"
		>
		<div class="soft-pro-box">
			<form @submit.prevent="saveUser">
				<div class="group-out">
					<div class="group">
						<label class="g-label">用户类型</label>
						<div class="box">
							<ask-radio name="type" v-model="model.radio" :label="4">普通用户</ask-radio>
							<ask-radio name="type" v-model="model.radio" :label="3">
								管理员
							<span class="small-tip">*限20名</span>
							</ask-radio>
						</div>
					</div>
					<div class="group">
						<label class="g-label">用户名称</label>
						<input type="text" 
							   placeholder="请填写用户名称" 
							   v-model="model.name"
							   v-validate="'required'"
							   name="name"
							   class="g-input" 
							   :class="{error: errors.has('name')}">
						<span class="tip" v-show="errors.has('name')">必填项</span>
					</div>
					<div class="group">
						<label class="g-label">登录密码</label>
						<input type="password" 
							   placeholder="请输入登录密码" 
							   v-model="model.pass"
							   v-validate="{'required':true,max:16,min:6}"
							   name="pass"
							   class="g-input" 
							   :class="{error: errors.has('pass')}">
						<span class="tip" v-show="errors.has('pass')">
							<template v-if="errors.has('pass:min') || errors.has('pass:max')">密码长度为6-16位</template>
							<template v-if="errors.has('pass:required')">必填项</template>
						</span>
					</div>
					<div class="group">
						<label class="g-label">确认密码</label>
						<input type="password" 
							   placeholder="请确认密码" 
							   v-model="model.passsure"
							   v-validate="{'required':true,max:16,min:6,password:true}"
							   name="passsure"
							   class="g-input" 
							   :class="{error: errors.has('passsure')}">

					    <span class="tip" v-show="errors.has('passsure')">
					    	<template v-if="errors.has('passsure:min') || errors.has('passsure:max')">密码长度为6-16位</template>
					    	<template v-if="errors.has('passsure:required')">必填项</template>
					    	<template v-if="errors.has('passsure:password')">{{errors.first('passsure:password')}}</template>
					    </span>
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
import { askDialogToast } from '@/utils';
import { DeviceSet } from '@/services';
import {Validator} from 'vee-validate'
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
				default: '添加用户'
			}
		},
		created(){
			Validator.extend('password', {
				getMessage(field, args) {
				    return '两次密码不一致';
			    },
				validate: value => {
				    return this.model.pass == value;
				}
			});
		},
		data(){
			return{
				inlineLoaderShow: false,
				model:{
					name:"",
					pass:"",
					passsure:"",
					radio:0
				}
			}
		},
		methods:{
			beforeClose(){
				this.$emit('onclose');
			},
			saveUser(){
				this.$validator.validateAll().then((result) => {
					if (result) {
						if(this.model.radio != 3 && this.model.radio != 4){
							askDialogToast({
								msg: '请选择用户类型！',
								time: 2000,
								position: 'top-center',
								class: 'danger'
							});
							return;
						}
						const deviceSetService = new DeviceSet();
						this.inlineLoaderShow = true;
						deviceSetService.addUserInfo({
							auth: this.$user.auth,
							imei: this.$route.params.imei,
							username: this.model.name,
							password: this.model.pass,
							type: this.model.radio
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
						return;
					}
					askDialogToast({
						msg: '请确保信息有效！',
						time: 2000,
						position: 'top-center',
						class: 'danger'
					});
				});
			}
		}
	}
</script>