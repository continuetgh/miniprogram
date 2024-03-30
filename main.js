import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globle.css'
import request from "@/utils/request"
import store from './store/store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false

new Vue({
  'el': '#main',
  data() {
    return { value: '' }
  }
})
Vue.use(ElementUI, { size: "min" });
Vue.use(mavonEditor);
Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')