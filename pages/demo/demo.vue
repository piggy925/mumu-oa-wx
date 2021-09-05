<template>
	<view>
		<view>{{username}}</view>
		<view v-for="tel in tels">{{tel}}</view>
		<view v-if="age > 18">
			<button @tap="signUp()">点击报名</button>
		</view>
		<view>
			<input type="text" v-model="address" placeholder="test" />
		</view>
		<view>{{address}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "MuMu",
				tels: ["123", "456", "789"],
				age: 20,
				address: ""
			}
		},
		methods: {
			signUp: function(){
				uni.showToast({
					title:"点击了报名按钮"
				})
			}
			
		}
	}
</script>

<style>            

</style>
