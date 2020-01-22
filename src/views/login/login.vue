<template>
	<div class="ask-login" v-nav="{hideNavbar: true}">
		<div class="ask-login-overlay">
			<img src="~@/assets/login_bg.png" alt="登录背景图">
		</div>
		<div class="ask-login-content">
			<div class="ask-login-box">
				<div class="alb-icon">
					<img src="~@/assets/icon_login.png" alt="登录图标">
				</div>
				<div class="alb-form">
					<div class="ask-input-box">
						<input type="text" placeholder="请输入用户名" v-model="model.user" v-validate="'required'" name="user" :class="{error: errors.has('user')}" id="username">
						<!-- <label for="username">
							<i class="iconfont icon-zhanghao"></i>
						</label> -->
					</div>
					<div class="ask-input-box">
						<input type="password" placeholder="请输入密码" v-model="model.pass" v-validate="'required'" name="pass" :class="{error: errors.has('pass')}" id="password">
						<!-- <label for="password">
							<i class="iconfont icon-mima"></i>
						</label> -->
					</div>
					<div class="ask-text-box">
						<div class="checkbox">
							<input type="checkbox" id="remember" v-model="model.remember">
							<label for="remember">记住密码(账号密码随便输入)</label>
						</div>
					</div>
					<div class="ask-button-box">
						<ask-button :text="'登录'" @ask-click="login"></ask-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style src="./login.scss" lang="scss"></style>
<script>
import { askDialogToast } from '@/utils'
import { User } from '@/services';
export default {
	name: 'login',
	inject:['rootMain'],
	data() {
		return {
			model: {
				user: '',
				pass: '',
				remember: false
			}
		}
	},
	mounted() {
		this.getUserMessage();
	},
	methods: {
		login() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					const user = new User();
					this.rootMain.loader(true);
					user.login(this.model).then(() => {
						this.rootMain.loader(false);
						this.$nextTick(()=>{
							if (this.$route.query.redirect) {
								this.$router.replace({ path: this.$route.query.redirect })
							} else {
								this.$router.replace({ name: 'home' });
							}
						});
					},error=>{
						this.rootMain.loader(false);
					});
					return;
				}
				askDialogToast({
					msg: '请确保登录信息有效！',
					time: 2000,
					position: 'top-center',
					class: 'danger'
				});
			})
		},
		getUserMessage() {
			const user = new User();
			if (user.user != 'none') {
				this.model.user = user.user.user;
				this.model.pass = user.user.pass;
				this.model.remember = true;
			}
		}
	}
}

</script>
