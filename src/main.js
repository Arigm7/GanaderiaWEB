import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify';
import Notifications from 'vue-notification'


Vue.config.productionTip = false
export const bus = new Vue()
Vue.use(Notifications)
new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
