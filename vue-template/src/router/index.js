import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';

// Views - Pages
import Page404 from '@/views/errorPages/Page404';
import Page500 from '@/views/errorPages/Page500';
import { mapGetters } from 'vuex';

/* login */
Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/pages',
    redirect: '/pages/p404',
    name: 'Pages',
    component: {
      render(c) {
        return c('router-view');
      }
      // Full,
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: _import('errorPages/Page404')
      },
      { path: '500', name: 'Page500', component: _import('errorPages/Page404') }
    ]
  }
];

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open',
  // scrollBehavior: () => ({ y: 0 }),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
  },
  routes: constantRouterMap
});

export var asyncRouterMap = [
  {
    path: '/',
    redirect: '/home',
    name: '首页',
    component: Full,
    hidden: false,
    children: [
      {
        path: '/home',
        name: '主页',
        icon: 'speedometer',
        component: _import('home')
      },
      {
        path: '/introduction',
        name: '使用介绍',
        icon: 'thumbsup',
        component: _import('Introduction')
      },
      {
        path: '/bigmenu',
        name: '菜单',
        icon: 'speedometer',
        component: _import('bigmenu')
      }
    ]
  },
  { path: '*', redirect: '/pages/404', hidden: true }
];
