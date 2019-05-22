import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
//import './mock/index.js';  // 该项目所有请求使用mockjs模拟
//这里使用mockjs模拟请求时，如果请求后端数据会出现跨域问题，因为他会把XhttpRequest对象代理掉
import './login.js' ;
import './ui.js';
import iView from 'iview';
import './deppon-theme/index.less';

Vue.use(iView);

Vue.config.productionTip = false;
var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
    //如果设置为不需要登录，直接加载静态的菜单路由
    //如果需要登录
    if(localStorage.getItem("TOKEN") && store.getters.needLoginFlag){
      //递归获取菜单数据，并将其修改为符合路由规则的数据
      store.dispatch('GenerateRoutes').then((createdRouters) => {
        router.addRoutes(createdRouters) // 动态添加可访问路由表
      })
    }
    if(!store.getters.needLoginFlag){
      store.dispatch('GenerateRoutesNoLogin').then((createdRouters) => { // 生成可访问的路由表
        router.addRoutes(createdRouters) // 动态添加可访问路由表
      })
    }
  }
 })
