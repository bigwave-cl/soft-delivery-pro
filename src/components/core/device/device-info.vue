<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.device-info{
	@include flexLayout(flex,normal,normal);
	.device-map{
		flex: 1 0 auto;
		max-width: calc(100% - 300px);
		position: relative;
		z-index: 2;
		height: 100%;
		&.full{
			max-width: 100%;
		}
	}
	.device-set{
		width: 300px;
		position: relative;
		z-index: 3;
	}
}
</style>
<template>
	<div class="device-info">
		<device-map :info="info" :class="{full: !(info && info.imei)}"></device-map>
		<device-set :info="info" v-if="info && info.imei"></device-set>
	</div>
</template>
<script>
import deviceSet from './device-set.vue';
import deviceMap from './device-map.vue';
import jump from 'jump.js'
export default {
	name: "DeviceInfo",
	props:['info'],
	components:{
		"device-set":deviceSet,
		"device-map":deviceMap,
	},
	watch:{
		info:{
			handler:function(n,o){
			},
			deep:true
		}
	}
}
</script>
