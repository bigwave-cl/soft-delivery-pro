<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
	.device-time{
		@include flexLayout(flex,normal,center);
		padding: 10px 10px;
		box-shadow: 0 0 12px map-get($color,800);
		background-color: map-get($color,200);
		border-radius: 4px;
		.time-box{
			@include flexLayout(flex,normal,center);
			padding: 10px 20px;
			border: 1px solid map-get($color,700S3);
			border-radius: 4px;
			cursor: pointer;
			.label-body{
				font-size: 1.4rem;
				color: map-get($color,A100);
				min-width: 140px;
				text-align: center;
				white-space: nowrap;
				&.to{
					padding: 0 10px;
					min-width: auto;
				}
			}
		}

		.el-range-editor.el-input__inner{
			padding: 5px 10px;
			height: auto;
		}
		.ask-button{
			min-width: auto;
			padding: 10px 16px;
			background-color: map-get($color,500S2);
			color: map-get($color,200);
			font-size: 1.6rem;
			border-radius: 4px;
			margin: 0 10px;
		}
	}
	
	.device-time-picker{
		.el-time-panel__content::after, 
		.el-time-panel__content::before{
			top: 55%;
		}
	}
	.device-time-select-modal.ask-modal-box{
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
	<div class="device-time">
		<!-- <el-date-picker 
			v-model="time" 
			:editable="false"
			:clearable="false"
			:unlink-panels="false"
			type="datetimerange" 
			format="yyyy-MM-dd HH:mm"
			popper-class="device-time-picker"
			:picker-options="endPickerOptions"
			range-separator="至" 
			start-placeholder="开始日期" 
			end-placeholder="结束日期">
		</el-date-picker> -->
		<div class="time-box" @click="openModal">
			<div class="label-body">{{model.start}}</div>
			<div class="label-body to">至</div>
			<div class="label-body">{{model.end}}</div>
		</div>
		<ask-button @ask-click="onClick">
			查询
		</ask-button>
		<ask-modal 
		:title="title" 
		:show.sync="show"
		:beforeClose="beforeClose"
		:showFooter="false"
		class="device-time-select-modal"
		>
		<div class="soft-pro-box">
			<form @submit.prevent="beforeClose" >
				<div class="group-out">
					<div class="group">
						<label>开始时间</label>
						<input-time :time="model.start" :max="model.end" @select="startChange"></input-time>
					</div>
					<div class="group">
						<label>结束时间</label>
						<input-time :time="model.end" :max="'now'" :min="model.start" @select="endChange"></input-time>
					</div>
				</div>
				<div class="button-group">
					<ask-button :type="'submit'" class="add">
						确定
					</ask-button>
				</div>
			</form>
		</div>
		</ask-modal>
	</div>
</template>
<script>
import inputTime from '../input-time/input-time.vue';
import moment from 'moment/moment.js';
	export default{
		name:'DeviceTime',
		components:{
			'input-time':inputTime,
		},
		data(){
			return{
				title:'选择时间',
				show: false,
				model:{
					start:moment().set({'hours':0,'minutes':0,'seconds':0,}).format("YYYY-MM-DD HH:mm:ss"),
					end:moment().format("YYYY-MM-DD HH:mm:ss")
				},
				time: [moment().set({'hours':0,'minutes':0,'seconds':0,}), moment()],
				endPickerOptions:{
					disabledDate(time){
						return moment(time).isAfter(moment());;
					}
				}
			}
		},
		methods:{
			openModal(){
				this.show = true;
			},
			onClick(){
				let _time = [];
				_time.push(this.model.start);
				_time.push(this.model.end);
				this.$emit('search-time',_time);
			},
			beforeClose(){
				this.show = false;
			},
			startChange(time){
				this.model.start = time;
			},
			endChange(time){
				this.model.end = time;
			}
		}
	}
</script>