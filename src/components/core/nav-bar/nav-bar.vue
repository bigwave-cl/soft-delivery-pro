<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ask-view.has-bar{
	padding-top: 62px;
}
.nav-bar {
	width: 100%;
	height: 62px;
	color: map-get($nav,text);
	font-size: 1.6rem;
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	background-color: map-get($nav,bg);
	z-index: 10;
	padding: 0 0 0 40px;
	@include flexLayout(flex,justify,center);
	.col-2{
		@include flexLayout(flex,normal,center);
		.logo{
			width: 32px;
			margin: 0 8px;
			img{
				width: 100%;
				vertical-align: bottom;
			}
		}
		.text{
			transform: translateY(-5%);
			font-size: 2.8rem;
			color: map-get($nav,logo);
		}
		.user-box{
			@include flexLayout(flex,right,center);
			.iconfont{
				font-size: 3.6rem;
				color: map-get($nav,text);
			}
			.info{
				max-width: 200px;
				padding: 0 12px;
				span{
					text-align: left;
					display: inline-block;
					width: 100%;
					@include textEllipsis(1);
					color: map-get($nav,text);
					font-size: 1.6rem;
				}
			}
		}
		.exit-box{
			font-size: 2rem;
			border-left: 1px solid map-get($nav,text);
			.ask-button{
				color: map-get($nav,text);
				padding: 4px 0;
				.iconfont{
					font-size: 3rem;
				}
			}
		}
	}
}

</style>
<template>
	<div class="nav-bar" v-show="show">
		<div class="col-2">
			<div class="logo">
				<img src="~@/assets/icon_home_logo.png" alt="logo">
			</div>
			<div class="text">
				安全递送·监管平台
			</div>
		</div>
		<div class="col-2">
			<div class="user-box">
				<i class="iconfont icon-zhanghao"></i>
				<div class="info">
					<!-- <span>&nbsp;账号</span> -->
					<span>{{$user && $user.name}}</span>
				</div>
			</div>
			<div class="exit-box">
				<ask-button @ask-click="loginOut"><i class="iconfont icon-logout"></i></ask-button>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import channel from './channel.js';
export default {
	name: 'NavBar',
	data(){
		return{
			headers:[],
			show:true
		}
	},
	mounted() {
		channel.$on('UpdateNavBar', (data) => {
			if(data.hideNavbar == !0) {
				this.show= false;
			}else{
				this.show= true;
			}
		})
	},
	methods:{
		loginOut(){
			this.$user.loginOut().then(r=>{
				this.$router.push('/login');
			});
		}
	}
}

</script>
