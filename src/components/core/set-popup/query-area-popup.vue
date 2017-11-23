<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.area-popup.ask-modal{
		width: 100%;
		padding: 0;
		border-radius: 0;
		height: 100%;
		overflow: hidden;
		background-color: transparent;
		.ask-modal-header{
			padding: 8px 40px;
			height: 62px;
			background-color: transparent;
			.ask-modal-title{
				position: relative;
				top: 50%;
				transform: translateY(-50%);
				color: map-get($color,200);
				font-size: 2.4rem;
				text-align: center;
			}
			.ask-close-icon{
				right: 34px;
				width: 40px;
				height: 40px;
				margin-top: -20px;
				&::before, &::after{
					height: 4px;
					margin-top: -2px;
					background-color: rgba(map-get($color,200),1);
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
			height: calc(100% - 62px);
			background-color: map-get($color,200);
		}
		.inline-loader-box .inline-loader .iconfont{
			padding: 10px 0;
			font-size: 4rem;
		}
		.soft-pro-box{
			width: 100%;
			height: 100%;
			#lock_area_map{
				width: 100%;
				height: 100%;

				.search-position {
					i {
						display: inline-block;
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
						&.position{
							background: no-repeat url('~@/assets/icon_position.png') transparent;
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
							@include flexLayout(flex, normal, normal);
							padding: 4px 0;
							.name {
								font-size: 1.4rem;
								color: map-get($color, A100);
								width: 34px;
							}
							.value {
								font-size: 1.4rem;
								color: map-get($color, 600);
								max-width: calc(100% - 34px);
								white-space: normal;
								word-break:break-all;
								&.opt{
									color: map-get($color,A200);
									cursor: pointer;
								}
							}
						}
					}
				}
			}
		}
	}
	.ask-modal.soft-pro-add-area{
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
			.box{
				width: 100%;
				padding: 40px 54px;
				@include flexLayout(flex,normal,center);
				label{
					width: 100px;
					font-size: 1.6rem;
					color: map-get($color,A100);
				}
				input{
					width: calc(100% - 100px);
					border: 1px solid map-get($color,700S3);
					color: map-get($color,A100);
					font-size: 1.6rem;
					padding: 10px 12px;
					border-radius: 4px;
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
		.ask-modal-footer{
			padding: 12px 0 24px;
			justify-content: center;
			.ask-button{
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
</style>
<template>
	<ask-modal  :show="show" 
				:title="title"
				@onclose="iconClose"
				:closeBtn ="true"
				:transition="'soft-pro-modal-full'"
				class="area-popup">
		<div class="soft-pro-box">
			<div id="lock_area_map"></div>
		</div>
	</ask-modal>
</template>
<script>

import { MAPKEY,MAPCENTER} from '@/config.js';

import { AMapLoad,askDialogAlert,askDialogToast } from '@/utils';

import { DeviceSet } from '@/services';
	export default{
		name:"ViewTImePopup",
		props:{
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			}
		},
		data(){
			return{
				AMap:null,
				map:null,
				query:[],
				polygons:[],
				markers:[],
				delList:[]
			}
		},
		async mounted() {
			await this.initAmap();
		},
		methods:{
			async initAmap() {
				await AMapLoad(MAPKEY).then(AMap => {
					this.AMap = AMap;
					this.map = new AMap.Map('lock_area_map', {
						center: MAPCENTER,
						zoom: 18
					})
					this.queryMapSet();
					this.map.setFitView();
				}, error => {
					console.log(error);
				})
			},
			queryMapSet(){
				this.query.map(index=>{
					let polygonArr = new Array();
					index.list.map(sub=>{
						polygonArr.push(sub);
					})
					const polygon = new this.AMap.Polygon({
						map: this.map,
					    path: polygonArr,//设置多边形边界路径
					    strokeColor: "#1791fc", //线颜色
					    strokeOpacity: 0.2, //线透明度
					    strokeWeight: 3,    //线宽
					    fillColor: "#1791fc", //填充色
					    fillOpacity: 0.35//填充透明度
					});
					let polygonCenter = polygon.getBounds().getCenter();
					let marker = new this.AMap.Marker({
						map: this.map,
						position: [polygonCenter.lng, polygonCenter.lat],
						offset: new this.AMap.Pixel(-20, -68),
						content: `<div class="search-position">
									<i class="iconimg position"></i>
								  </div>`
					});
					let infoWindow = new this.AMap.InfoWindow({
						isCustom: true, //使用自定义窗体
						content: this.buildWindow(index,marker,polygon),
						offset: new this.AMap.Pixel(16, -92)
					});
					this.AMap.event.addListener(marker, 'click', () => {
						infoWindow.open(this.map, marker.getPosition());
					});
					this.AMap.event.addListener(polygon, 'click', () => {
						infoWindow.open(this.map, marker.getPosition());
					});
					this.polygons.push(polygon);
					this.markers.push(marker);
				})
			},
			buildWindow(index,marker,polygon) {
				let info = document.createElement("div");
				info.className = "location-info";
				let data = [{
					name: '名称',
					value: index.name || '无'
				}, {
					name: '位置',
					value: index.address || '无'
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

				let optEl = document.createElement("li");
				optEl.className = "info-li";
				let optNameEl = document.createElement("div");
				optNameEl.className = "name";
				optNameEl.innerHTML = '操作:';
				let optValueEl = document.createElement("div");
				optValueEl.className = "value opt";
				optValueEl.innerHTML = "删除";
				optValueEl.onclick = (e)=>{
					if (e.stopPropagation) e.stopPropagation();
					else e.cancelBubble = true;
					const deviceSetServer = new DeviceSet();
					deviceSetServer.delAreaList({
						auth: this.$user.auth,
						imei: this.$route.params.imei,
						id: index.id
					}).then(r=>{
						if(r.data.code != 1000) {
							askDialogToast({msg:r.data.message? r.data.message:`"${index.name}"删除失败`,time:2000,class:'danger'});
							return;
						}
						if(r.data.code == 1000){
							this.delList.push(index);
							this.map.remove(marker);
							this.map.remove(polygon);
							this.map.clearInfoWindow();
							askDialogToast({msg:r.data.message? r.data.message:`"${index.name}"删除成功`,time:2000,class:'success'});
						}
					})
				}

				optEl.appendChild(optNameEl);
				optEl.appendChild(optValueEl);
				bodys.appendChild(optEl);

				let box = document.createElement("div");
				box.className = 'info-box';
				box.appendChild(bodys);
				info.appendChild(box);
				info.onclick = () => {
					this.map.clearInfoWindow();
				}
				return info;
			},
			iconClose(){
				this.$emit('onclose');
			}
		}
	}
</script>