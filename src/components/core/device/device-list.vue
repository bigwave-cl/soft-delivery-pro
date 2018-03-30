<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.device-list {
	.device-menu-box{
		width: 100%;
		height: calc(100% - 70px);
		overflow-y:auto;
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
	}
	.device-list-menu {
		background-color: rgba(map-get($color, 400), .5);
		position: relative;
		border-right: none;
		border-top: 1px solid map-get($color, 200);
		& .el-submenu .el-menu {
			background-color: map-get($color, 300);
		}
		.el-menu-item:focus, .el-submenu__title:focus,
		.el-menu-item:hover, .el-submenu__title:hover {
			background-color: rgba(map-get($color, 400), .7);
		}
		.el-menu-item, .el-submenu__title {
			font-size: 1.6rem;
			color: map-get($color, 200);
			position: relative;
			height: 40px;
			line-height: 40px;
			&::after {
				content: '';
				position: absolute;
				z-index: 1;
				pointer-events: none;
				background: map-get($color, 200);
				height: 1px;
				left: 0;
				right: 0;
				bottom: 0;
				@media only screen and (-webkit-min-device-pixel-ratio: 2) {
					& {
						-webkit-transform: scaleY(0.5);
						-webkit-transform-origin: 50% 0%;
					}
				}
			}
			&.is-active {
				background-color: transparent;
				.dl-name.online{
					color:#ffd04b;
				}
			}
			.iconfont {
				font-size: 2rem;
				padding: 0 2px;
				&.icon-gongsi {
					color: map-get($color, 200);
				}
			}
		}
		.dl-name{
			display: inline-block;
			/* width: 98px; */
			width: 80px;
			line-height: normal;
			@include textEllipsis(1);
			&.online{
				color: map-get($color,500S2);
			}
		}
		.el-menu-item.is-remote{
			background-color: map-get($color,A400);
		}
		.icon-remote{
			color: map-get($color,200);
			font-size: 1.6rem;
			font-weight: 900;
			border: 2px solid map-get($color,200);
			border-radius: 4px;
			font-style: normal;
			width: 26px;
			height: 24px;
			text-align: center;
			line-height: 20px;
			display: inline-block;
		}
		.icon-suo {
			color: map-get($color, 200);
		}
		.icon-xiangzi {
			color: map-get($icon, 100);
		}
		.icon-dunpai1 {
			color: map-get($icon, 200);
		}
		.icon-yichangminglu {
			color: map-get($icon, 300);
			text-shadow: 0 0 12px map-get($color, 200);
		}
		.icon-displacement{
			width: 20px;
		}
		.ask-button{
			width: 100%;
			min-width: auto;
		}
		.device-electricity{
			display: inline-block;
			width: 48px;
			height: 22px;
			position: relative;
			font-size: 12px;
			color: map-get($color,200);
			line-height: 22px;
			overflow: hidden;
			transform: scale(.75);
			transform-origin:center center;
			.iconfont{
				display: inline-block;
				color:inherit;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate3d(-40%,-28%,0);
				z-index: 1;
				text-align: center;
				font-size: 28px;
			}
			.electricity{
				position: relative;
				z-index: 2;
				text-align: center;
			}
		}
		.sub-right{
			transform: translate3d(-20px,0,0);
		}
	}
}
</style>
<template>
	<div class="device-list">
		<device-search></device-search>
		<div class="device-menu-box">
			<el-menu 
				:default-active="defaultActive" 
				class="device-list-menu" 
				active-text-color="#ffd04b" 
				:unique-opened="true"
				@select="onSelect">
				<template v-for="(device,$d) in devices">
					<template v-if="device.device_list && device.device_list.length > 0">
						<el-submenu :index="$d+1+''">
							<template slot="title">
								<i class="iconfont icon-gongsi"></i>
								<span>{{device.name}}</span>
								<i class="iconfont icon-yichangminglu" v-if="device.abnormal"></i>
							</template>
							<template v-for="(sub,$s) in device.device_list">
								<el-menu-item :index="`${$d+1}-${$s+1}`" @click="onClick(sub)" 
									:class="{'is-remote': sub.authorize == 1}">
									<template slot="title">
										<div class="sub-right">
											<div class="device-electricity" :style="{visibility: sub.online ? 'visible':'hidden'}">
												<i class="iconfont icon-dianliang"></i>
												<div class="electricity">{{sub.soc <= 0 ? 0 : sub.soc}}%</div>
											</div>
											<i class="iconfont icon-suo" :style="{visibility:(sub.lock_man == 1) ? 'visible':'hidden'}"></i>
											<span class="dl-name" :class="{'online':sub.online}">{{sub.name}}</span>
											<i class="iconfont icon-xiangzi" v-if="sub.open == 1"></i>
											<i class="iconfont icon-dunpai1" v-if="sub.place_status == 2"></i>
											<img class="icon-displacement" v-if="sub.dislocation_status == 2" src="~@/assets/icon_displacement.png" alt="icon">
										</div>
									</template>
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
					<template v-else>
						<el-menu-item :index="$d+1+''" @click="onClick(device)" :class="{'is-remote': device.authorize == 1}">
							<template slot="title">
								<div class="device-electricity" :style="{visibility: device.online ? 'visible':'hidden'}">
									<i class="iconfont icon-dianliang"></i>
									<div class="electricity">{{device.soc <= 0 ? 0 : device.soc}}%</div>
								</div>
								<i class="iconfont icon-suo" :style="{visibility:(device.lock_man == 1) ? 'visible':'hidden'}"></i>
								<span class="dl-name" :class="{'online':device.online}">{{device.name}}</span>
								<i class="iconfont icon-xiangzi" v-if="device.open == 1"></i>
								<i class="iconfont icon-dunpai1" v-if="device.place_status == 2"></i>
								<img class="icon-displacement" v-if="device.dislocation_status == 2" src="~@/assets/icon_displacement.png" alt="icon">
							</template>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</div>
	</div>
</template>
<script>
import deviceSearch from './device-search.vue';
import jump from 'jump.js'
export default {
	name: "DeviceList",
	components:{
		"device-search":deviceSearch
	},
	data(){
		return{
			defaultActive: ''
		}
	},
	inject:['rootHome'],
	props: ['devices'],
	mounted(){
		this.menuActiveInit();
	},
	methods: {
		onClick(once){
			if( once.place_status == 2 ||
				once.open == 1 ||
				once.dislocation_status == 2){
				this.$emit('device-abnormal');
			}
			this.rootHome.refreshDevice();
			this.$router.push({ path: `/home/${once.imei}?l=${Date.now()}`});
		},
		onSelect(index,indexPath,item){
		},
		menuActiveInit(){
			if(this.devices.length <= 0) return;
			this.$nextTick(()=>{
				let menu = '';
				let _con = true;
				this.devices.map((index,keys)=>{
					if(index.imei == this.$route.params.imei &&  _con == !0){
						menu = keys+1+'';
						_con = false;
					}else{
						if(index.device_list && index.device_list.length >0){
							index.device_list.map((sub,subK)=>{
								if(sub.imei == this.$route.params.imei && _con == !0){
									menu = (keys+1)+'-'+(subK+1);
									_con = false;
								}
							})
						}
					}
				})
				if(menu != ''){
					this.defaultActive = menu;
					this.$nextTick(()=>{
						let outerEl = this.$el.querySelector('.device-menu-box');
						if(outerEl.scrollHeight <= outerEl.clientHeight) return;
						let sub = null;
						if(menu.indexOf('-') == -1){
							sub = this.$children[1].items[this.defaultActive].$el.getBoundingClientRect();
						}else{
							sub = this.$children[1].items[this.defaultActive].$parent.$el.getBoundingClientRect();
						}

						let outerScroll = outerEl.scrollTop;
						//70--是搜索框的高度，62--是导航栏的高度
						let subScroll = outerScroll + sub.top - 70 - 62;
						this.$el.querySelector('.device-menu-box').scrollTop = subScroll;
					})
				}
			})
		}
	},
	watch:{
		'$route' (to, from) {
			if(to.name == 'homeInfo'){
				this.$nextTick(()=>{
					this.menuActiveInit();
				})
			}else{
				this.defaultActive = '';
			}
		},
		"devices":{
			handler: function(n, o) {
				this.$nextTick(()=>{
					this.menuActiveInit();
				})
			},
			deep: true
		}
	}
}

</script>
