<!-- TOP -->
<template>
  <v-form
    ref="form"
    @submit.prevent="submit()"
  >
    <v-text-field
      v-model="form_data.name"
      label="お名前"
      name="text215"
    />
    <v-text-field
      v-model="form_data.email"
      label="メールアドレス"
      type="email"
      name="email439"
    />
    <v-text-field
      v-model="form_data.phone"
      label="電話番号"
      type="tel"
      name="tel443"
    />
    <v-textarea
      v-model="form_data.message"
      name="textarea440"
      label="問い合わせ内容"
    />
    <v-checkbox
      v-model="form_data.checked"
      name="checkbox403"
      label="送信前にチェックを入れてください。"
      value="送信前にチェックを入れてください。"
    />
    <v-btn
      type="submit"
      width="100%"
    >
      送信する
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'FormInput',
  data () {
    return {
      form_data: {
        name: '',
        email: '',
        phone: '',
        message: '',
        checked: false
      }
    }
  },
  head () {
    return {
      title: 'お問い合わせ'
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
      this.form_data.checked = false
    },
    async submit () {
      // 1. 送信データ用意
      const emailBody = {
        text215: this.form_data.name,
        email439: this.form_data.email,
        tel443: this.form_data.phone,
        textarea440: this.form_data.message,
        checkbox403: this.form_data.checked
      }
      // 2. formData生成
      const form = new FormData()
      for (const field in emailBody) {
        form.append(field, emailBody[field])
      }
      // 3. post
      await this.$axios
        .post(
          'https://freelance321.com/wp-json/contact-form-7/v1/contact-forms/7/feedback',
          form
        ).then((response) => {
          console.log(response)
          this.clear()
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
