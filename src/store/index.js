import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    currentMenu: null,
    menu: [],
    token: ''
  },
  getters: {},
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const res = state.tabList.findIndex((item) => item.name === val.name)
        if (res === -1) {
          state.tabList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    },
    closeTag(state, val) {
      const res = state.tabList.findIndex((item) => item.name === val.name)
      state.tabList.splice(res, 1)
    },
    setToken(state, val) {
      state.token = val
      Cookies.set('token', val)
    },
    clearToken(state) {
      state.token = ''
      Cookies.remove('token')
    },
    getToken(state) {
      state.token = state.token || Cookies.get('token')
    },
    setMenu(state, val) {
      state.menu = val
      Cookies.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookies.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookies.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookies.get('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          menuArray.push(item)
        }
      })
      // 动态路由添加
      menuArray.forEach((item) => {
        router.addRoute('main', item)
      })
    }
  },
  actions: {},
  modules: {}
})
