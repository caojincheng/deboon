import router from './router'
import store from './store'
import vue from 'vue'
import {getToken} from 'utils/util';
import { Base64 } from 'js-base64';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  //如果已经有token了，就直接登陆系统
if(localStorage.getItem("TOKEN") || !store.getters.needLoginFlag){
    next();
  }else{
    //如果没有token，则获取token值
      const tgc = getToken('TGC');
      const u = getToken('U');
      const tokenNums = getToken('_TOKENUUMS');
      /**
        * 判断是否已登录
        * 未登录跳转到无访问权限页
        * 已登录获取工号，存到 localStorage 中
        */
      if (!tgc || !u || !tokenNums) {
        //TODO dispatch(routerRedux.push('/noAccess'));
      //FIXME 这个需要跳转到dpboot中的action中，
        store.dispatch('loginToServer');

      } else {
        const token = Base64.decode(tokenNums);
        localStorage.setItem("TOKEN",tokenNums);
        // store.dispatch('setUserToken',tokenNums);
        const tokenArr = token.split(',');
        //1,设置用户信息
        store.dispatch('setUserInfo',{userName:tokenArr[1],deptCode: tokenArr[3],deptName: tokenArr[4]});
        //2，产生动态路由，生成菜单树
        next();

        //FIXME 拿到 token后，可以访问
      }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
