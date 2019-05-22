import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueClipboard from 'vue-clipboard2';
import menuButton  from './components/MenuButton.vue';
Vue.component('menuButton',menuButton);
Vue.use(VueClipboard);
Vue.use(iView, {
    transfer: true,
    size: 'default'
});
