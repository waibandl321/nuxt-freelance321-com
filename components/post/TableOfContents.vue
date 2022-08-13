<template>
  <v-list class="first">
    <div
      v-for="(item, idx) in items"
      :key="idx"
    >
      <v-list-item
        v-scroll-to="'#' + item.id"
        debse
        nuxt
        href="#"
      >
        <v-list-item-content>
          {{ item.name }}
        </v-list-item-content>
      </v-list-item>
      <div
        v-show="item.sub.length > 0"
        class="second"
      >
        <v-list-item
          v-for="(sub, idx2) in item.sub"
          :key="idx2"
          v-scroll-to="'#' + sub.id"
          dense
          nuxt
          href="#"
        >
          <v-list-item-content>
            <v-list-item-title>{{ sub.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
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
          const h3s = tmpElmt.querySelectorAll('h3')
          h3s.forEach((h3) => {
            if (h3.getAttribute('id').includes(h2.id + '_')) {
              h2.sub.push(
                {
                  id: h2.id + '_' + h3.getAttribute('id').slice(-1),
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
  position: sticky;
  top: 84px;
}
.second {
  padding-left: 16px;
}
</style>
