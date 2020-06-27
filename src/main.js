// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img1.imgtn.bdimg.com/it/u=3779605030,1222595953&fm=27&gp=0.jpg',
  loading: 'http://nn.zp365.com/2016gfj/images/loading.gif',
  attempt: 1
});


//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
//使用轮播图插件
Vue.use(VueAwesomeSwiper);
require('swiper/dist/css/swiper.css');
Vue.config.productionTip = false;

import store from './store'
//在进入路由之前 每一个都会执行此方法  全局钩子
router.beforeEach(function (to,from,next) {
  document.title=to.meta.title;
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
