<template>
  <v-list class="outline">
    <div
      v-for="(h2Element, idx) in items"
      :key="idx"
      class="outline__first"
    >
      <v-list-item
        v-scroll-to="'#' + h2Element.h2.id"
        debse
        nuxt
        href="#"
      >
        <v-list-item-content>
          {{ h2Element.h2.name }}
        </v-list-item-content>
      </v-list-item>
      <div class="outline__second">
        <v-list-item
          v-for="(item, idx2) in h2Element.h2.sub"
          :key="idx2"
          v-scroll-to="'#' + item.h3.id"
          dense
          nuxt
          href="#"
        >
          <v-list-item-content>
            {{ item.h3.name }}
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const items = ref()
    onMounted(() => {
      createTableOfContents()
    })

    function createTableOfContents () {
      const divElement = document.createElement('div')
      divElement.innerHTML = props.content
      const h2Elements: NodeListOf<HTMLHeadingElement> = divElement.querySelectorAll('h2')
      const h3Elements: NodeListOf<HTMLHeadingElement> = divElement.querySelectorAll('h3')

      items.value = Array.from(h2Elements).map<HTMLHeadingElement>(item => ({
        h2: {
          id: item.id,
          name: item.textContent,
          sub: Array.from(h3Elements).filter(v => v.getAttribute('id')?.includes(item.id + '_')).map<HTMLHeadingElement>(item => ({
            h3: {
              id: item.id,
              name: item.textContent
            },
            ...item
          }))
        },
        ...item
      }))
    }

    return {
      items
    }
  }
})
</script>

<style scoped lang="scss">
@import "assets/css/style.scss";
.outline {
  font-size: $font-size-small;
  position: sticky;
  padding-top: 0;
  top: $header-height;
  max-height: $content-max-height;
  overflow: auto;
  &__second {
    padding-left: 16px;
  }
}
</style>
