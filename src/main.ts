import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from "@/store";
// @ts-ignore
// import VueCodemirror from 'vue-codemirror';
// import 'codemirror/lib/codemirror.css';

Vue.config.productionTip = false;
// Vue.use(VueCodemirror, /* {
//   options: { theme: 'base16-dark', ... },
//   events: ['scroll', ...]
// } */);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
