<template>
  <v-list class="first">
    <v-list-item
      v-for="(item, idx) in items"
      :key="idx"
    >
      <div>
        <a :href="'#' + item.id">{{ item.name }}</a>
      </div>
      <v-list class="second">
        <v-list-item
          v-for="(sub, idx2) in item.sub"
          :key="idx2"
        >
          <a :href="'#' + sub.id">{{ sub.name }}</a>
        </v-list-item>
      </v-list>
    </v-list-item>
  </v-list>
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
    this.createTableOfContents()
  },
  methods: {
    createTableOfContents () {
      const tmpElmt = document.createElement('div')
      tmpElmt.innerHTML = this.content
      const result = []
      try {
        const h2_elements = tmpElmt.querySelectorAll('h2')
        h2_elements.forEach((h2, idx2) => {
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
      } catch {}
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
