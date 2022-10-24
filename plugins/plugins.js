import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import VueScrollTo from 'vue-scrollto'
import Vuelidate from 'vuelidate'

Vue.use(VueHighlightJS)
Vue.use(Vuelidate)
Vue.use(VueScrollTo, {
  duration: 700,
  easing: [0, 0, 0.1, 1],
  offset: -100
})

export default {
  validation_errors: {
    email: '適切なEmail形式で入力してください。',
    phone: '適切な電話番号ではありません',
    required: '入力必須です',
    checked: '送信前にチェックを入れてください'
  }
}
