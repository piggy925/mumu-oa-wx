<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				readFlag: null,
				refId: null,
				sendTime: '',
				msg: ''
			}
		},
		onShow: function() {

		},

		onLoad: function(options) {
			let that = this
			that.id = options.id
			that.readFlag = options.readFlag == "true"
			that.refId = options.refId
			if (!that.readFlag) {
				that.ajax(that.url.updateUnreadMessage, "POST", {
					"id": that.refId
				}, function(resp) {
					console.log("消息更新成已读状态")
				})
			}
		},

		methods: {

		}
	}
</script>

<style lang="less">
	@import url("message.less");
</style>
