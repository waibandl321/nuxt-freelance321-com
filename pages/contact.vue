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
      :change-mode="changeMode"
      :form_data="form_data"
    />
    <ContactFormConfirm
      v-if="mode === 'confirm'"
      :change-mode="changeMode"
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
import { GOOGLE_FORM_URL } from '@/config/blog'

export default {
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

      await this.$axios.post(GOOGLE_FORM_URL, form)
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
      this.loading = false
    }
  }
}
</script>
