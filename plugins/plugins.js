import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueHighlightJS)
Vue.use(VueScrollTo, {
  duration: 700,
  easing: [0, 0, 0.1, 1],
  offset: -100
})
