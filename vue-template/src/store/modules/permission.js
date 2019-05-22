import { constantRouterMap,asyncRouterMap } from 'src/router';
import {getMenu} from 'api/login';
const _import = require('@/router/_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if(route.component){
      route.component = _import(route.component);
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}


function getNowRouter(asyncRouterMap, to) {
  return asyncRouterMap.some(route => {
      if(to.path.indexOf(route.path) !==-1) {
          return true;
      }
      else if (route.children && route.children.length) { //如果有孩子就遍历孩子
        return  getNowRouter(route.children, to)
      }
  })
}

//返回router对象
function getMenuRouters(node){
    let routerMenuList = [];

    getMenu(node).then((result) => {
    let routerMenu = {};
    const nodes = result.data.nodes;
    if(node==='0'){
      nodes.splice(0,1);
    }
    if(nodes!==null){
        nodes.forEach((menu,index) => {
      //1,封装成Router组建
      //2，如果有子菜单，遍历找到所有的子菜单
      if(!menu.leaf){
        routerMenu = {
          path: menu.uri===null ? '' : menu.uri,
          name: menu.text,
          icon: menu.iconCls,
          hidden:false,
          component: {render (c) { return c('router-view') }},
         children: getMenuRouters(menu.id)
        };
      }else{
        routerMenu = {
          path: menu.uri,
          name: menu.text,
          icon: menu.iconCls,
          hidden:false,
          component: menu.uri === null ? {} : menu.uri.substring(1,menu.uri.length)
        };
      }
      //封装成router对象
      routerMenuList.push(routerMenu);
    });
    }
  }).catch((err) => {
    console.log('err:'+err);
  });
  return routerMenuList;
}

//转换菜单信息到路由
function RouterConverter(menuRouters){
  for( var i = 0; i < menuRouters.length; i++){
    const menu = menuRouters[i];

    if(menu.component && !(menu.component instanceof Object)){
      // console.log(menu)
      menu.component = _import(menu.component)
    }
    // if(menu.)
    if(menu.children){
      RouterConverter(menu.children)
    }

  }
  return menuRouters;
}



const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    siderbar_routers:[]
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.siderbar_routers = menus;
    },

    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers)

    },

     SET_NOW_ROUTERS: (state, to) => {
        // 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给siderbar_routers
        state.addRouters.forEach(e => {
          // console.log(e);
          if(e.children&& e.children.length ){
           if( getNowRouter(e.children,to)===true)
                  state.siderbar_routers=e;
          }
        })
     }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data
        // let accessedRouters = [];
        // if (roles.indexOf('admin') >= 0) {
          // accessedRouters = asyncRouterMap
        // } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        //获取路由数据
        let menuRouters = getMenuRouters('0');
        // menuRouters.forEach(routerMenu1 => {
        //   console.log(routerMenu1)
        //   childRouters.push(routerMenu1);
        // })
        // console.log(menuRouters);
        //menuRouters.concat([{ path: '*', redirect: '/pages/404', hidden: true }]);
        //const notFoundPage = { path: '*', redirect: '/pages/404', hidden: true };

        commit('SET_MENUS',menuRouters);


        //如何设置路由呢？？？？
        //1，遍历获取的菜单信息，将菜单信息封装成component组件
        let menuRouter = []
        var timer = setInterval(function (){
          if(menuRouter.length <= 0){
            menuRouter = RouterConverter(menuRouters);
            let accessedRouters = [
              {
                 path: '/',
                 redirect: '/home',
                 name: '首页',
                 component: Full,
                 hidden:false,
                 children : menuRouter
              }
              ,{ path: '*', redirect: '/pages/404', hidden: true }
            ];
            commit('SET_ROUTERS', accessedRouters);
            resolve(accessedRouters);
          }else{
            clearInterval(timer)
          }
        },500);

        setTimeout(function(){
          clearInterval(timer)
        },60000)
      })
    },

    getNowRoutes({ commit },data) {
        return new Promise(resolve => {
          //data => to
          commit('SET_NOW_ROUTERS',data);
          resolve();
        })
    },

//不需要登录时走下面这两个方法
    GenerateRoutesNoLogin({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_MENUS',asyncRouterMap[0].children);
        commit('SET_ROUTERS', asyncRouterMap);
        resolve(asyncRouterMap);
      })
    },

    getNowRoutesNoLogin({ commit }, data) {
        return new Promise(resolve => {
          //data => to
          commit('SET_NOW_ROUTERS', data);
          resolve();
        })
    },
   },
};

export default permission;
