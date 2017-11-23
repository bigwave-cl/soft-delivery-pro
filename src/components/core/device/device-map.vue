<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.device-map {
	#device_map_container {
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	.position-marker {
		position: relative;
		width: 42px;
		height: 76px;
		text-align: center;
		.icon {
			width: 100%;
			height: 100%;
			&.position {
				background: no-repeat url('~@/assets/icon_current.png') transparent;
				background-size: 100% 100%;
				background-position: center top;
			}
		}
	}
	.device-map-search {
		position: absolute;
		top: 20px;
		right: 30px;
		min-width: 450px;
		z-index: 4;
	}
	.device-buttons {
		position: absolute;
		top: 120px;
		right: 30px;
		z-index: 4;
		pointer-events: none;
		.buttons-box {
			width: 60px;
			.ask-button {
				display: inline-block;
				min-width: auto;
				width: 60px;
				height: 60px;
				line-height: 60px;
				padding: 0;
				pointer-events: auto;
				background-color: map-get($color, 200);
				box-shadow: 0 0 18px map-get($color, 800);
				margin: 10px 0;
				border-radius: 4px;
				.iconfont {
					font-size: 5rem;
				}
				.iconimg {
					display: block;
					width: 100%;
					height: 100%;
					&.icon-displacement {
						background: no-repeat url('~@/assets/icon_displacement.png') transparent;
						background-size: auto 70%;
						background-position: center center;
					}
				}
				& .icon-dunpai1 {
					color: map-get($icon, 200);
				}
				& .icon-xiangzi {
					color: map-get($icon, 100);
				}
				& .icon-weizhi {
					color: map-get($icon, 400);
				}
			}
		}
	}
	.ask-hover {
		.hover-tip {
			white-space: nowrap;
			font-size: 1.6rem;
			position: absolute;
			top: 50%;
			right: 100%;
			transform-origin:100% 50%;
			transform: translateY(-50%) scale(0, 1);
			z-index: 2;
			background-color: #384959;
			border-radius: 4px;
			color: #fff;
			margin-right: 10px;
			padding: 10px 16px;
			line-height: normal;
			opacity: 0;
			transition: transform .3s ease, opacity .3s ease;
		}
		&:hover {
			.hover-tip {
				opacity: 1;
				transform: translateY(-50%) scale(1, 1);
				transition: transform .3s cubic-bezier(.4, 0, 0, 1.5), opacity .3s cubic-bezier(.4, 0, 0, 1.5);
			}
		}
	}
	.search-position {
		i {
			font-size: 3rem;
			color: map-get($localtion, 100);
		}
		&.first {
			i {
				color: map-get($localtion, 200);
			}
		}
		&.safe {
			i {
				color: map-get($localtion, 300);
			}
		}
		.iconimg {
			display: inline-block;
			position: relative;
			width: 42px;
			height: 76px;
			text-align: center;
			&.box {
				background: no-repeat url('~@/assets/icon_box.png') transparent;
				background-size: 100% 100%;
				background-position: center top;
			}
			&.displacement {
				background: no-repeat url('~@/assets/icon_displacement_map.png') transparent;
				background-size: 100% 100%;
				background-position: center top;
			}
			&.protection {
				background: no-repeat url('~@/assets/icon_protection.png') transparent;
				background-size: 100% 100%;
				background-position: center top;
			}
		}
	}
	.location-info {
		width: 240px;
		min-height: 20px;
		padding: 10px;
		border: 1px solid map-get($color, 900);
		background-color: map-get($color, 200);
		cursor: pointer;
		position: relative;
		z-index: 1;
		box-shadow: 0 0 12px map-get($color, 800);
		&::after {
			position: absolute;
			z-index: 3;
			top: 100%;
			left: 50%;
			display: block;
			width: 50px;
			height: 10px;
			content: '';
			transform: translate(-50%, -130%) rotate(135deg) skewX(-65deg);
			border: 1px solid map-get($color, 900);
			background-color: map-get($color, 200);
			box-shadow: -20px -10px 5px map-get($color, 800);
		}
		&::before {
			position: absolute;
			z-index: 4;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			height: 100%;
			content: '';
			background-color: map-get($color, 200);
		}
		.info-box {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 5;
		}
		.info-list {
			width: 100%;
			.info-li {
				@include flexLayout(flex, normal, center);
				padding: 4px 0;
				.name {
					font-size: 1.4rem;
					color: map-get($color, A100);
				}
				.value {
					font-size: 1.4rem;
					color: map-get($color, 600);
					-webkit-box-flex: 1;
					-ms-flex: 1 0 auto;
					flex: 1 0 auto;
				}
			}
		}
	}
}

</style>
<template>
	<div class="device-map">
		<div id="device_map_container"></div>
		<!-- <div class="device-map-search ask-hover">
			<device-time @search-time="onSearch"></device-time>
			<div class="hover-tip">历史轨迹查询</div>
		</div> -->

		<el-tooltip content="历史轨迹查询" placement="left" :enterable="false">
			<div class="device-map-search">
				<device-time @search-time="onSearch"></device-time>
			</div>
		</el-tooltip>
		<div class="device-buttons">
			<div class="buttons-box">
				<!-- <ask-button class="ask-hover" @ask-click="onClick('yellow')">
					<i class="iconimg icon-displacement"></i>
					<div class="hover-tip">离位报警轨迹</div>
				</ask-button>
				<ask-button class="ask-hover" @ask-click="onClick('red')">
					<i class="iconfont icon-dunpai1"></i>
					<div class="hover-tip">布防报警位置</div>
				</ask-button>
				<ask-button class="ask-hover" @ask-click="onClick('green')">
					<i class="iconfont icon-xiangzi"></i>
					<div class="hover-tip">开箱的位置点</div>
				</ask-button>
				<ask-button class="ask-hover" @ask-click="onClick('now')">
					<i class="iconfont icon-weizhi"></i>
					<div class="hover-tip">安全箱当前位置</div>
				</ask-button> -->
				<el-tooltip content="离位报警轨迹" placement="left" :enterable="false">
					<ask-button @ask-click="onClick('yellow')">
						<i class="iconimg icon-displacement"></i>
					</ask-button>
				</el-tooltip>
				<el-tooltip content="布防报警位置" placement="left" :enterable="false">
					<ask-button @ask-click="onClick('red')">
						<i class="iconfont icon-dunpai1"></i>
					</ask-button>
				</el-tooltip>
				<el-tooltip content="开箱的位置点" placement="left" :enterable="false">
					<ask-button @ask-click="onClick('green')">
						<i class="iconfont icon-xiangzi"></i>
					</ask-button>
				</el-tooltip>
				<el-tooltip content="安全箱当前位置" placement="left" :enterable="false">
					<ask-button @ask-click="onClick('now')">
						<i class="iconfont icon-weizhi"></i>
					</ask-button>
				</el-tooltip>
			</div>
		</div>
	</div>
</template>
<script>
import { AMapLoad } from '@/utils';
import { MAPKEY, MAPCENTER } from '@/config.js';
import { Device } from '@/services';
import deviceTime from './device-time.vue';
let MARKER_ALL = 0,
	MARKER_GREEN = 1,
	MARKER_RED = 2,
	MARKER_YELLOW = 3;
export default {
	name: "DeviceMap",
	inject: ['rootMain'],
	props:['info'],
	components: {
		"device-time": deviceTime
	},
	data() {
		return {
			AMap: null,
			map: null,
			deviceServer: new Device(),
			line: [],
			renderLine: [],
			markers: [],
			polyline: ''
		}
	},
	async mounted() {
		await this.initAmap();
		this.currentPostion();
	},

	watch:{
		info:{
			handler:function(n,o){
			},
			deep:true
		},
		'$route' (to, from) {
			if(to.name == 'homeInfo'){
				if( this.AMap != null ){
					this.currentPostion();
				}
			}
		}
	},
	methods: {
		onClick(type) {
			if (type == 'now') {
				this.currentPostion()
			}
			if (type == 'yellow') {
				this.filterYellow()
			}
			if (type == 'red') {
				this.filterRed()
			}
			if (type == 'green') {
				this.filterGreen()
			}
		},
		async initAmap() {
			await AMapLoad(MAPKEY).then(AMap => {
				this.AMap = AMap;
				this.map = new AMap.Map('device_map_container', {
					center: MAPCENTER,
					zoom: 18
				})
			}, error => {
				console.log(error);
			})
		},
		/**
		 * 获取当前位置
		 * @Author   陈龙
		 * @DateTime 2017-11-17
		 */
		currentPostion() {
			if (this.AMap == null || this.$route.params.imei == void 0 || this.$route.params.imei == '') {
				this.removeMapMulch();
				return;
			}
			// this.rootMain.loader(true);
			this.deviceServer.currentPostion({
				auth: this.$user.auth,
				imei: this.$route.params.imei
			}).then(r => {
				if(!r.data.data) return;
				// this.rootMain.loader(false);
				this.setMapMarker(r.data.data.lng, r.data.data.lat);
			}, error => {
				// this.rootMain.loader(false);
			})
		},
		setMapMarker(lng, lat) {
			if (this.map == null) return;
			this.removeMapMulch();
			let marker = new this.AMap.Marker({
				map: this.map,
				position: [lng, lat],
				offset: new this.AMap.Pixel(-20, -68),
				content: `<div class="position-marker">
							  <div class="icon position"></div>
						</div>`
			});
			this.markers.push(marker);
			this.map.setFitView();
		},
		//移除地图上的覆盖物
		removeMapMulch() {
			this.map.remove(this.markers);
			this.map.remove(this.polyline);
			this.map.clearInfoWindow();
			this.markers = [];
			this.polyline = '';
			this.renderLine = [];
		},
		mapRenderLine(type) {
			if(this.renderLine.length == 0) return;
			let markeIcon = '';
			if (type === MARKER_GREEN) markeIcon = 'box';
			if (type === MARKER_RED) markeIcon = 'protection';
			if (type === MARKER_YELLOW) markeIcon = 'displacement';
			let lineArr = [];
			this.renderLine.map(index => {
				if(index.lng == null || index.lat == null) return;
				let marker = null;
				if (type === MARKER_ALL) {
					marker = new this.AMap.Marker({
						map: this.map,
						position: [index.lng, index.lat],
						offset: new this.AMap.Pixel(-15, -32),
						content: `<div class="search-position">
									<i class="iconfont icon-dingwei"></i>
								  </div>`
					});
				} else {
					marker = new this.AMap.Marker({
						map: this.map,
						position: [index.lng, index.lat],
						offset: new this.AMap.Pixel(-20, -68),
						content: `<div class="search-position">
									<i class="iconimg ${markeIcon}"></i>
								  </div>`
					});
				}

				let circle = new this.AMap.Circle({
					center: new this.AMap.LngLat(index.lng, index.lat), // 圆心位置
					radius: index.location_radius || 0, //半径
					strokeColor: "#F33", //线颜色
					strokeOpacity: .8, //线透明度
					strokeWeight: 1, //线粗细度
					fillColor: "#ee2200", //填充颜色
					fillOpacity: .25 //填充透明度

				});
				let infoWindow = null;
				if (type === MARKER_ALL) {
					infoWindow = new this.AMap.InfoWindow({
						isCustom: true, //使用自定义窗体
						content: this.buildWindow(index),
						offset: new this.AMap.Pixel(16, -54)
					});
				} else {
					infoWindow = new this.AMap.InfoWindow({
						isCustom: true, //使用自定义窗体
						content: this.buildWindow(index),
						offset: new this.AMap.Pixel(16, -92)
					});
				}
				this.AMap.event.addListener(marker, 'click', () => {
					infoWindow.open(this.map, marker.getPosition());
				});
				marker.on('mouseover', () => {
					circle.setMap(this.map);
				})
				marker.on('mouseout', () => {
					this.map.remove(circle)
				})
				lineArr.push([index.lng, index.lat]);
				this.markers.push(marker);
			})
			this.map.setFitView();
			if(lineArr.length == 0) return;
			this.polyline = new this.AMap.Polyline({
				path: lineArr, // 设置线覆盖物路径
				isOutline: true, //是否描边
				outlineColor: '#40D3D5', //设置描边颜色，当outlineColor为true时有效
				strokeColor: '#40D3D5', // 线颜色
				strokeOpacity: 1, // 线透明度
				strokeWeight: 8, // 线宽
				strokeStyle: 'solid', // 线样式
				strokeDasharray: [10, 5], // 补充线样式
				geodesic: false, // 绘制大地线
				lineJoin: 'round', //转角样式
				showDir: true //是否延路径显示白色方向箭头
			});
			this.polyline.setMap(this.map);
		},
		buildWindow(index) {
			let info = document.createElement("div");
			info.className = "location-info";
			let data = [{
				name: '时间',
				value: '2017-05-06 14:14'
			}, {
				name: '经纬度',
				value: index.lng + ',' + index.lat
			}, {
				name: '速度',
				value: index.speed + 'km/s'
			}, {
				name: '状态',
				value: this.buildState(index)
			}, {
				name: '定位方式',
				value: '基站定位'
			}, {
				name: '误差范围',
				value: (index.location_radius || 0) +'米'
			}]

			let bodys = document.createElement("ul");
			bodys.className = "info-list";
			data.map(once => {
				let liEl = document.createElement("li");
				liEl.className = "info-li";
				let nameEl = document.createElement("div");
				nameEl.className = "name";
				nameEl.innerHTML = once.name + ':';
				let valueEl = document.createElement("div");
				valueEl.className = "value";
				valueEl.innerHTML = once.value;
				liEl.appendChild(nameEl);
				liEl.appendChild(valueEl);
				bodys.appendChild(liEl);
			})
			let box = document.createElement("div");
			box.className = 'info-box';
			box.appendChild(bodys);
			info.appendChild(box);
			info.onclick = () => {
				this.map.clearInfoWindow();
			}
			return info;
		},
		buildState(index) {
			let _text = '正常';
			if (index.dislocation_status == 2) {
				_text = '离位报警';
				return _text;
			}
			if (index.place_status == 2) {
				_text = '布防报警';
				return _text;
			}
			if (index.open == 1) {
				_text = '开箱';
				return _text;
			}
			return _text;
		},
		onSearch(time) {
			this.removeMapMulch();
			this.rootMain.loader(true);
			let option = {
				auth: this.$user.auth,
				imei: this.$route.params.imei,
				start: time[0],
				end: time[1]
			};
			this.deviceServer.searchPosition(option).then(r => {
				this.rootMain.loader(false);
				if(!r.data.data||r.data.data.length == 0) return;
				this.line = [];
				r.data.data.map(index => {
					this.line.push(index);
					this.renderLine.push(index);
				})
				this.mapRenderLine(MARKER_ALL);
			}, error => {
				this.rootMain.loader(false);
			})
		},
		filterYellow() {
			if (this.line.length <= 0) return;
			this.removeMapMulch();
			this.renderLine = this.line.filter(index => index.dislocation_status == 2);
			this.mapRenderLine(MARKER_YELLOW);
		},
		filterRed() {
			if (this.line.length <= 0) return;
			this.removeMapMulch();
			this.renderLine = this.line.filter(index => index.place_status == 2);
			this.mapRenderLine(MARKER_RED);
		},
		filterGreen() {
			if (this.line.length <= 0) return;
			this.removeMapMulch();
			this.renderLine = this.line.filter(index => index.open == 1);
			this.mapRenderLine(MARKER_GREEN);
		}
	}
}

</script>
