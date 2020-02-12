import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from "@/store";
import * as firebase from "firebase";
// @ts-ignore
// import VueCodemirror from 'vue-codemirror';
// import 'codemirror/lib/codemirror.css';
const firebaseConfig = {
  apiKey: "AIzaSyA8k7ghTiPwrLdmttwiop9itHD8BKFidJ0",
  authDomain: "codify-8daa8.firebaseapp.com",
  databaseURL: "https://codify-8daa8.firebaseio.com",
  projectId: "codify-8daa8",
  storageBucket: "codify-8daa8.appspot.com",
  messagingSenderId: "811437480681",
  appId: "1:811437480681:web:f4ec60d42d497e4ca1ee78",
  measurementId: "G-4XKEG79EHC"
};

firebase.initializeApp(firebaseConfig);

export const DB = firebase.firestore();

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
