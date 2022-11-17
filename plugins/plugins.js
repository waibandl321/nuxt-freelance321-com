import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import VueScrollTo from 'vue-scrollto'
import VueI18n from 'vue-i18n'

Vue.use(VueHighlightJS)
Vue.use(VueScrollTo, {
  duration: 700,
  easing: [0, 0, 0.1, 1],
  offset: -100
})
Vue.use(VueI18n)
