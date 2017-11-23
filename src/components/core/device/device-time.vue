<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
	.device-time{
		@include flexLayout(flex,normal,center);
		padding: 10px 10px;
		box-shadow: 0 0 12px map-get($color,800);
		background-color: map-get($color,200);
		border-radius: 4px;

		.el-range-editor.el-input__inner{
			padding: 5px 10px;
			height: auto;
		}
		.ask-button{
			min-width: auto;
			padding: 12px 16px;
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
</style>
<template>
	<div class="device-time">
		<el-date-picker 
			v-model="time" 
			type="datetimerange" 
			format="yyyy-MM-dd HH:mm"
			popper-class="device-time-picker"
			range-separator="至" 
			start-placeholder="开始日期" 
			end-placeholder="结束日期">
		</el-date-picker>
		<ask-button @ask-click="onClick">
			查询
		</ask-button>
	</div>
</template>
<script>
import moment from 'moment/moment.js';
	export default{
		name:'DeviceTime',
		data(){
			return{
				time: [new Date(), new Date()]
			}
		},
		methods:{
			onClick(){
				let _time = [];
				_time.push(moment(this.time[0]).format("YYYY-MM-DD HH:mm"));
				_time.push(moment(this.time[1]).format("YYYY-MM-DD HH:mm"));
				this.$emit('search-time',_time);
			}
		}
	}
</script>
