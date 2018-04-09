// =============== 선언부 =============== //
import Vue from 'vue'
import App from './App'
import router from './router'// 라우터
import axios from 'axios' // http모듈


import  store  from './vuex/store'


console.log(store);

// =============== 미들웨어 =============== //

// 서버와 분리시 세션유지
axios.defaults.withCredentials = true

// 백엔드 Base URL
axios.defaults.baseURL = process.env.BACKEND_URL

// Axios
// Vue.prototype.$http = axios;

// 라우터
Vue.prototype.$ro = router;

// BACKEND_URL
Vue.prototype.$backend = process.env.BACKEND_URL;
Vue.config.productionTip = true

// EventBus 사용
Vue.prototype.$EventBus = new Vue();



// =============== 렌더링 =============== //
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,              // 라우터
  http: axios,       // http모듈
  store,                // vuex상태관리
  render: h => h(App)
})
