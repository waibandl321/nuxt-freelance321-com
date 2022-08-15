import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

export default {
  validation_errors: {
    email: '適切なEmail形式で入力してください。',
    phone: '適切な電話番号ではありません',
    required: '入力必須です',
    checked: '送信前にチェックを入れてください'
  }
}
