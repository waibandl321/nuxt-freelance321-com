<!-- TOP -->
<template>
  <v-form
    ref="form"
    @submit.prevent="submit()"
  >
    <div>
      <v-text-field
        v-model.trim="$v.form_data.name.$model"
        label="お名前"
        name="entry.247993782"
        hide-details="auto"
      />
    </div>
    <div class="input-error" v-if="!$v.form_data.name.required">
      「お名前」は入力必須です
    </div>
    <div class="mt-10">
      <v-text-field
        v-model.trim="$v.form_data.email.$model"
        label="メールアドレス"
        type="email"
        name="entry.2089866053"
        hide-details="auto"
      />
      <div
        v-if="!$v.form_data.email.required"
        class="input-error"
      >
        「メールアドレス」は入力必須です
      </div>
      <div
        v-if="!$v.form_data.email.email"
        class="input-error"
      >
        適切なメールアドレスの形式ではありません
      </div>
    </div>
    <div class="mt-10">
      <v-text-field
        v-model.trim="$v.form_data.phone.$model"
        label="電話番号(ハイフンなし)"
        type="number"
        name="entry.666391459"
        hide-details="auto"
      />
      <div class="input-error" v-if="!$v.form_data.phone.required">
        「電話番号」は入力必須です
      </div>
    </div>
    <div class="mt-10">
      <v-textarea
        v-model.trim="$v.form_data.message.$model"
        name="entry.682995808"
        label="問い合わせ内容（150文字以内）"
        :maxlength="maxLength_message"
        hide-details="auto"
        :counter="maxLength_message"
      />
      <div
        v-if="!$v.form_data.message.required"
        class="input-error"
      >
        「問い合わせ内容」は入力必須項目です
      </div>
    </div>
    <div class="mt-10">
      <v-checkbox
        v-model="$v.form_data.checked.$model"
        name="entry.1849326221_sentinel"
        label="送信前にチェックを入れてください。"
        value="送信前にチェックを入れてください。"
        hide-details="auto"
      />
      <div
        v-if="!$v.form_data.checked.isChecked"
        class="input-error"
      >
        チェックは必須です
      </div>
    </div>
    <div class="mt-10">
      <v-btn
        @click="clickConfirm()"
        width="100%"
        :disabled="$v.$invalid"
        color="primary"
      >
        確認画面へ
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { required, maxLength, email } from 'vuelidate/lib/validators'
const isChecked = (value) => {
  return value === '送信前にチェックを入れてください。'
}
export default {
  name: 'FormInput',
  props: {
    changeMode: Function,
    form_data: Object
  },
  validations: {
    form_data: {
      name: { required },
      email: {
        required,
        email
      },
      phone: {
        required
      },
      message: {
        required,
        maxLengthValue: maxLength(10)
      },
      checked: { isChecked }
    }
  },
  data () {
    return {
      maxLength_message: 150,
      maxLength_phone: 11
    }
  },
  head () {
    return {
      title: 'お問い合わせ'
    }
  },
  methods: {
    clickConfirm () {
      // eslint-disable-next-line vue/no-mutating-props
      this.changeMode('confirm')
    }
  }
}
</script>
<style scoped>
.input-error {
  font-size: 12px;
  color: red;
  margin-top: 10px;
}
</style>
