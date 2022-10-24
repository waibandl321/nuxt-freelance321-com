<template>
  <div>
    <CommonMessageViewer :message="message" />
    <div class="font-weight-bold">
      以下の内容で送信してよろしいですか？
    </div>
    <div class="mt-10">
      <v-simple-table>
        <template #default>
          <tbody>
            <tr>
              <td>お名前</td>
              <td>{{ form_data.name }}</td>
            </tr>
            <tr>
              <td>メールアドレス</td>
              <td>{{ form_data.email }}</td>
            </tr>
            <tr>
              <td>電話番号</td>
              <td>{{ form_data.phone }}</td>
            </tr>
            <tr>
              <td>問い合わせ内容</td>
              <td>{{ form_data.message }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div class="text-center mt-10">
      <v-btn @click="changeMode('input')">
        入力画面に戻る
      </v-btn>
      <v-btn
        color="success"
        class="ml-6"
        @click="submit()"
      >
        送信
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormConfirm',
  props: {
    changeMode: Function,
    submit: Function,
    form_data: Object,
    message: Object
  }
}
</script>
