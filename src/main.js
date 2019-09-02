import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
//引入主样式
import fastclick from "fastclick";
fastclick.attach(document.body);//作用于整个页面

import "./common/stylus/index.styl";

Vue.config.productionTip = false
//使用vant组件库的轮播组件
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);


new Vue({
	router,
	// store,
	render: h => h(App)
}).$mount('#app')
