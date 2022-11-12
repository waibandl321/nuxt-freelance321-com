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
            {{ sub.name }}
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const items = ref([])

    onMounted(() => {
      createTableOfContents()
    })

    function createTableOfContents () {
      const divElement = document.createElement('div')
      divElement.innerHTML = props.content
      const result = []
      const h2_elements = divElement.querySelectorAll('h2')
      const h3_elements = divElement.querySelectorAll('h3')
      h2_elements.forEach((H2, idx2) => {
        H2.id = 'outline__' + Number(idx2 + 1)
        H2.name = H2.textContent
        H2.sub = []
        h3_elements.forEach((H3) => {
          if (H3.getAttribute('id') && H3.getAttribute('id').includes(H2.id + '_')) {
            const obj = {
              id: H2.id + '_' + H3.getAttribute('id').slice(-1),
              name: H3.textContent
            }
            H2.sub.push(obj)
          }
        })
        result.push(H2)
      })
      items.value = result
    }

    return {
      items
    }
  }
})
</script>

<style scoped>
.v-list-item {
  display: block;
}
.first {
  font-size: 13px;
  position: sticky;
  padding-top: 0;
  top: 84px;
  max-height: calc(100vh - 162px);
  overflow: auto;
}
.second {
  padding-left: 16px;
}
</style>
