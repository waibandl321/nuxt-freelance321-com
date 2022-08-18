<!-- TOP -->
<template>
  <div>
    <CommonLoadingOverlay
      v-if="loading"
    />
    <v-card-title
      class="px-0 font-weight-bold"
    >
      お問い合わせ
    </v-card-title>
    <ContactFormInput
      v-if="mode === 'input'"
      :changeMode="changeMode"
      :form_data="form_data"
    />
    <ContactFormConfirm
      v-if="mode === 'confirm'"
      :changeMode="changeMode"
      :submit="submit"
      :form_data="form_data"
      :message="message"
    />
    <ContactFormSent
      v-if="mode === 'sent'"
    />
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  layout: 'page',
  data () {
    return {
      mode: 'input',
      loading: false,
      form_data: {
        name: '',
        email: '',
        phone: '',
        message: '',
        checked: null
      },
      message: {
        error: ''
      }
    }
  },
  methods: {
    changeMode (mode) {
      this.mode = mode
    },
    init () {
      this.form_data = {
        name: '',
        email: '',
        phone: '',
        message: '',
        checked: null
      }
    },
    async submit () {
      this.loading = true
      this.message.error = ''
      // 1. 送信データ用意
      const emailBody = {
        'entry.247993782': this.form_data.name,
        'entry.2089866053': this.form_data.email,
        'entry.666391459': this.form_data.phone,
        'entry.682995808': this.form_data.message,
        'entry.1849326221_sentinel': this.form_data.checked
      }
      // 2. formData生成
      const form = new FormData()
      for (const field in emailBody) {
        form.append(field, emailBody[field])
      }

      // const CORS_PROXY = 'http://localhost:3000/'
      const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeQMtV-x4ZXnHqmy7XoUeqJUFhgYgjCkp3wG56_IS7hGP6kNQ/formResponse'
      await this.$axios.post(GOOGLE_FORM_ACTION, form)
        .then((response) => {
          if (response.status === 200) {
            this.init()
            this.mode = 'sent'
          } else {
            this.message.error = 'フィームの送信に失敗しました。時間を置いてから再度送信ください。'
          }
        }).catch((error) => {
          this.message.error = 'フィームの送信に失敗しました。時間を置いてから再度送信ください。'
          console.log(error)
        })
      // 3. post
      // await this.$axios
      //   .post(
      //     'https://admin.freelance321.com/wp-json/contact-form-7/v1/contact-forms/7/feedback',
      //     form
      //   ).then((response) => {
      //     console.log(response)
      //     if (response.status === 200 && response.data.status === 'mail_sent') {
      //       this.init()
      //       this.mode = 'sent'
      //     } else {
      //       this.message.error = response.data.message
      //     }
      //   }).catch((error) => {
      //     this.message.error = 'フィームの送信に失敗しました。時間を置いてから再度送信ください。'
      //     console.log(error)
      //   })
      this.loading = false
    }
  }
}
</script>
