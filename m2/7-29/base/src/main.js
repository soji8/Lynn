import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {registerMicroApps,setDefaultMountApp,start} from "qiankun";
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

registerMicroApps([
  {
    name: 'app1',            // 子应用名称
    entry: '//localhost:7101',  // 子应用入口
    container: '#app1',    // 子应用所在容器
    activeRule: '/content2'         // 子应用触发规则（路径）
  },
  {
    name: 'app2',
    entry: '//localhost:7102',
    container: '#app2',
    activeRule: '/content3'
  }
]);

setDefaultMountApp('/');

start();