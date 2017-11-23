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
				default: '鼠标在地图上点击绘制多边形量测区域，双击或右键结束量测操作'
			}
		},
		data(){
			return{
				AMap:null,
				map:null,
				area:{
					lnglats: [],
					name: ''
				}
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
					this.addMapSet();
					this.map.setFitView();
				}, error => {
					console.log(error);
				})
			},
			addMapSet(){
				this.map.plugin(["AMap.MouseTool"], () => {
					const mouseTool = new this.AMap.MouseTool(this.map);
					const polygonSet = {
						strokeColor: "#1791fc", //线颜色
						strokeOpacity: 0.2, //线透明度
						strokeWeight: 3,    //线宽
						fillColor: "#1791fc", //填充色
						fillOpacity: 0.35//填充透明度
					};
					//鼠标工具插件添加draw事件监听
					this.AMap.event.addListener(mouseTool, "draw", (e) => {
						const eObject = e.obj; //obj属性就是鼠标事件完成所绘制的覆盖物对象。
						setTimeout(() => {
							askDialogAlert({
								title: '区域锁定',
								class: 'soft-pro-add-area',
								msg: `
										<div class="box">
											<label for="lock_area_input">区域名称</label>
											<input type="text" id="lock_area_input" name="" value="" placeholder="请输入名称">
										</div>
										`
							}, (vm) => {
								vm.okLoader = false;
								const name = document.getElementById('lock_area_input');
								if (name.value == void 0 || name.value == '' || name.value == null) {
									askDialogToast({ msg: '请输入名称', class: 'danger' })
									return;
								}
								vm.okLoader = true;
								eObject.getPath().map(index => {
									this.area.lnglats.push([index.lng,index.lat]);
								})

								this.area.name = name.value.trim();
								this.buildAddress(this.area.lnglats[0]).then(address=>{
									const deviceSetService = new DeviceSet();
									deviceSetService.addAreaList({
										auth: this.$user.auth,
										imei: this.$route.params.imei,
										lnglats: JSON.stringify(this.area.lnglats),
										lng:this.area.lnglats[0][0],
										lat:this.area.lnglats[0][1],
										address: address,
										name: this.area.name
									}).then(r=>{
										vm.okLoader = false;
										vm.close();
										if(r.data.code != 1000) {
											askDialogToast({msg:r.data.message? r.data.message:`"${this.area.name}"添加失败`,time:2000,class:'danger'});
											return;
										}
										if(r.data.code == 1000){
											askDialogToast({msg:r.data.message? r.data.message:`"${this.area.name}"添加成功`,time:2000,class:'success'});
										}
										this.$emit('onclose');
									},error=>{
										vm.okLoader = false;
									})
								})
							}, () => {
								mouseTool.close(true);
								mouseTool.polygon(polygonSet);
							}, () => {
								mouseTool.close(true);
								mouseTool.polygon(polygonSet);
							});
						}, 0);
					});
					mouseTool.polygon(polygonSet); //调用鼠标工具的面积量测功能
				});
			},
			iconClose(){
				this.$emit('onclose');
			},
			buildAddress(data){
				return new Promise((resolve, reject)=>{
					this.AMap.plugin(["AMap.Geocoder"], () => {
						const geocoder = new this.AMap.Geocoder({
				           radius: 1000,
				           extensions: "all"
				        });
				        geocoder.getAddress(data, function(status, result) {
		                    if (status === 'complete' && result.info === 'OK') {
		                    	resolve(result.regeocode.formattedAddress);
		                    }
		                }); 
					});
				})
			}
		}
	}
</script>