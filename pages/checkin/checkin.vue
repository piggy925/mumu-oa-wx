<template>
	<view>
		<camera device-position="front" flash="off" class="camera" @error="error()" v-if="showCamera"></camera>
		<image class="image" :src="photoPath" mode="widthFix" v-if="showImage"></image>
		<view class="operate-container">
			<button type="primary" class="btn" :disabled="canCheckin" @tap="clickBtn()">{{btnText}}</button>
			<button type="warn" class="btn" :disabled="canCheckin" @tap="afresh()">重拍</button>
		</view>
		<view class="notice-container">
			<text class="notice">注意事项</text>
			<text class="desc">拍照签到的时候，必须要拍摄自己的正面照片，侧面照片会导致无法识别。另外，拍照的时候不要戴墨镜或者帽子，避免影响拍照签到的准确度。</text>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				canCheckin: false,
				photoPath: '',
				btnText: "拍照",
				showCamera: true,
				showImage: false
			}
		},
		onLoad: function() {
			qqmapsdk = new QQMapWX({
				key: "KG2BZ-57MCU-XULVM-4R433-UM5AV-KJF2B"
			})
		},
		methods: {
			clickBtn: function() {
				let that = this;
				if (that.btnText == "拍照") {
					let ctx = wx.createCameraContext();
					ctx.takePhoto({
						quality: 'high',
						success: function(resp) {
							console.log(resp.tempImagePath)
							that.photoPath = resp.tempImagePath;
							that.btnText = "签到";
							that.showCamera = false;
							that.showImage = true;
						}
					})
				} else {
					//点击签到
					uni.showLoading({
						title: "签到中，请稍后"
					})
					setTimeout(function() {
						uni.hideLoading()
					}, 30000)
					uni.getLocation({
						type: "wgs84",
						success: function(resp) {
							let latitude = resp.latitude;
							let longitude = resp.longitude;
							qqmapsdk.reverseGeocoder({
								location: {
									latitude: latitude,
									longitude: longitude
								},
								success: function(resp) {
									let address = resp.result.address;
									let addressComponent = resp.result.address_component;
									let nation = addressComponent.nation;
									let province = addressComponent.province;
									let city = addressComponent.city;
									let distract = addressComponent.distract;
								}
							})
						}
					})
				}
			},
			afresh: function() {
				this.showCamera = true;
				this.showImage = false;
				this.btnText = '拍照';
			}
		}
	}
</script>

<style lang="less">
	@import url("checkin.less");
</style>
