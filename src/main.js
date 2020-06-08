import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueSimplemde from 'vue-simplemde'
import Shortkey from 'vue-shortkey'

import List from './components/List'
import TopBar from './components/TopBar'
import Storage from './components/Storage'

import Default from "./layouts/Default";
import store from './store'

Vue.component('default', Default)
Vue.component('editor', VueSimplemde)

Vue.component('list', List)
Vue.component('top-bar', TopBar)
Vue.component('storage', Storage)

Vue.use(Shortkey)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
