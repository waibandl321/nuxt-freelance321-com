<template>
  <ul class="first">
    <li
      v-for="(item, idx) in items"
      :key="idx"
    >
      <div>
        <a :href="'#' + item.id">{{ item.name }}</a>
      </div>
      <ul class="second">
        <li
          v-for="(sub, idx2) in item.sub"
          :key="idx2"
        >
          <a :href="'#' + sub.id">{{ sub.name }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>

export default {
  name: 'TableOfContents',
  props: {
    content: String
  },
  data: () => ({
    items: []
  }),
  mounted () {
    // 目次生成
    this.createTableOfContents()
  },
  methods: {
    createTableOfContents () {
      const tmpElmt = document.createElement('div')
      tmpElmt.innerHTML = this.content
      // h2とh3タグを目次の対象とする
      const result = []
      tmpElmt.querySelectorAll('h2').forEach((h2, idx2) => {
        h2.id = 'outline__' + Number(idx2 + 1)
        h2.name = h2.textContent
        h2.sub = []
        tmpElmt.querySelectorAll('h3').forEach((h3, idx3) => {
          if (h3.getAttribute('id').includes(h2.id + '_')) {
            h2.sub.push(
              {
                id: h2.id + '_' + Number(idx3 + 1),
                name: h3.textContent
              }
            )
          }
        })
        result.push(h2)
      })
      this.items = result
    }
  }
}
</script>

<style scoped>
.v-list-item {
  display: block;
}
.first {
  font-size: 14px;
}
.second {
  padding-left: 16px;
}
</style>
