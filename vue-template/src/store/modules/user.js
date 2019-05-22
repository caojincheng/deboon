import Cookies from 'js-cookie';
import {login,logout} from 'api/login';

const user = {
  state: {
    token: Cookies.get('Admin-Token'),
    userInfo: {userName:'', deptCode: '', deptName: ''},
    //是否需要后台登录的标志，true需要登录，false不需要登录
    needLoginFlag: false,
    notshowRoutName:[]//隐藏菜单数组
    // notshowRoutName:["使用介绍"]//隐藏菜单数组示例 
  },

  mutations: {
    //设置用户信息
    SET_USERINFO: (state,userInfo) => {
      state.userInfo = userInfo;
    }
  },

  actions: {

    loginToServer(){
      login();
    },
    
    setUserInfo({commit}, userInfo){
      return new Promise(resolve => {
        commit('SET_USERINFO',userInfo);
        resolve();
      })
    },

    setUserToken({commit}, token){
      return new Promise(resolve => {
        commit('SET_TOKEN',token);
        resolve();
      })
    },

    LogOut(){
      return new Promise((resolve,reject)=>{
        logout().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err)
        });
      })
      // logout().then((result) => {
      //   this.loginToServer();        
      // }).catch((err) => {
      //   console.log("logout error:"+err)
      // });
    }
  }
};

export default user;
