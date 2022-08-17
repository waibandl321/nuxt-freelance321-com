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
          if (response.status === 200 && response.data.status === 'mail_sent') {
            this.init()
            this.mode = 'sent'
          }
        }).catch((error) => {
          this.message.error = 'フィームの送信に失敗しました。時間を置いてから再度送信ください。'
          console.log(error)
        })
      this.loading = false
    }
  }
}
</script>
