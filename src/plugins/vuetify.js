// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSession from 'vue-session'                                   
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);
Vue.use(VueSession)

const opts = {};

export default new Vuetify(opts);