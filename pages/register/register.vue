<template>
	<view>
		<image src="../../static/logo-2.png" mode="widthFix" class="logo"></image>
		<view class="register-container">
			<input type="number" class="register-code" placeholder="输入你的邀请码" maxlength="6" v-model="registerCode" />
			<view class="register-desc">管理员创建员工账号之后，你可以从你的个人邮箱种获得注册邀请码</view>
			<button class="btn-register" @click="register()">执行注册</button>
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
			register: function() {
				let vueObj = this;
				if (vueObj.registerCode == null || vueObj.registerCode == "") {
					uni.showToast({
						icon: "none",
						title: "注册码不能为空"
					})
					return;
				} else if (!/^[0-9]{6}$/.test(vueObj.registerCode)) {
					uni.showToast({
						icon: "none",
						title: "注册码必须为6位数字"
					})
					return;
				}

				let code = '';
				uni.login({
					provider: "weixin",
					success: function(resp) {
						code = resp.code;
					}
				});

				uni.getUserProfile({
					desc: "weixin",
					success: function(resp) {
						console.log(resp)
						let nickName = resp.userInfo.nickName;
						let avatarUrl = resp.userInfo.avatarUrl;
						console.log("login code: " + code);
						let data = {
							code: code,
							nickname: nickName,
							photo: avatarUrl,
							registerCode: vueObj.registerCode
						}
						vueObj.ajax(vueObj.url.register, "POST", data, function(resp) {
							let permission = resp.data.permission;
							uni.setStorageSync("permission", permission);
							console.log("permission: " + permission);
							//TODO 跳转到index页面
							uni.switchTab({
								url:"../index/index"
							})
						})
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");
</style>
