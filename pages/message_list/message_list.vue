<template>
	<view class="page">
		<uni-list>
			<uni-list>
				<uni-list-chat v-for="one in list" :key="one.id" :title="one.senderName" :note="one.msg"
					:avatar="one.senderPhoto" badgePositon="left" :badge-text="one.readFlag ? '' : 'dot'" link="navigateTo"
					:to="''">
					<view class="chat-custom-right">
						<text class="chat-custom-text">{{one.senderTime}}</text>
					</view>
				</uni-list-chat>
			</uni-list>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	export default {
		data() {
			return {
				page: 1,
				length: 20,
				list: [{
					id: "61505ad5047e322c78b22d15",
					refId: "3dd91350209e48ad8e3b6b0a5dba9ad1",
					senderName: "系统消息",
					senderPhoto: "https://static-1258386385.cos.ap-beijing.myqcloud.com/img/System.jpg",
					msg: "这是第8条测试消息",
					readFlag: false,
					senderTime: "2021-09-26 19:34:45.04"
				}],
				isLastPage: false
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import url("message_list.less");
</style>
