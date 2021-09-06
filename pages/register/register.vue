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
				uni.login({
					provider: "weixin",
					success: function(resp) {
						console.log(resp.code)
					}
				})
				uni.getUserProfile({
					desc: "weixin",
					success: function(resp) {
						console.log(resp)
					}

				});
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");
</style>
