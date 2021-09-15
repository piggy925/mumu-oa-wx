<template>
	<view>
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="logo-title">MuMu在线办公系统</view>
		<view class="logo-subtitle">Ver 1.0</view>
		<button class="btn-login" open-type="getUserInfo" @tap="login()">登录系统</button>
		<view class="register-container">
			没有账号？
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			login: function() {
				let vueObj = this;
				uni.login({
					provider: "weixin",
					success: function(resp) {
						let code = resp.code;
						vueObj.ajax(vueObj.url.login, "POST", {
							"code": code
						}, function(resp) {
							let permission = resp.data.permission;
							uni.setStorageSync("permission", permission);
							console.log("login success")
							//TODO 跳转到登录页面
							uni.switchTab({
								url:"../index/index"
							})
						});
					},
					fail: function(e) {
						console.log("login error: " + e);
						uni.showToast({
							icon: "none",
							title: "登录失败"
						})
					}
				})
			},
			toRegister: function() {
				uni.navigateTo({
					url: "../register/register"
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>
