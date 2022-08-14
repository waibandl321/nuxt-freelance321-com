<!-- TOP -->
<template>
  <div>
    <v-form
      ref="form"
      @submit.prevent="submit()"
    >
      <v-text-field
        label="お名前"
        v-model="form_data.name"
        name="text215"
      ></v-text-field>
      <v-text-field
        label="メールアドレス"
        v-model="form_data.email"
        type="email"
        name="email439"
      ></v-text-field>
      <v-text-field
        label="電話番号"
        v-model="form_data.phone"
        type="tel"
        name="tel443"
      ></v-text-field>
      <v-textarea
        v-model="form_data.message"
        name="textarea440"
        label="問い合わせ内容"
      ></v-textarea>
      <v-checkbox
        v-model="form_data.checked"
        name="checkbox403"
        label="送信前にチェックを入れてください。"
        value="送信前にチェックを入れてください。"
      ></v-checkbox>
      <v-btn
        type="submit"
        width="100%"
      >
        送信する
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  layout: 'page',
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
