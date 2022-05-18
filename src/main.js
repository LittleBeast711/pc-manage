import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
