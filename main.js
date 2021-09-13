import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()

let baseUrl = "http://localhost:8080/mumu-oa"
Vue.prototype.url = {
	register: baseUrl + "/user/register",
	login: baseUrl + "/user/login",
} 

Vue.prototype.ajax = function(url, method, data, fun) {
	uni.request({
		url: url,
		method: method,
		header: {
			"token": uni.getStorageSync("token")
		},
		data: data,
		success: function(resp) {
			if (resp.statusCode == 401) {
				uni.redirectTo({
					url: "/pages/login/login.vue"
				})
			} else if (resp.statusCode == 200 && resp.data.code == 200) {
				let data = resp.data;
				if (data.hasOwnProperty("token")) {
					let token = data.token;
					console.log("token: " + token);
					uni.setStorageSync("token", token);
				}
				//执行传入的匿名函数
				fun(resp);
			} else {
				uni.showToast({
					icon: "none",
					title: resp.data
				})
			}

		}
	})

}
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
