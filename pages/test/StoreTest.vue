<template>
  <div>
    <v-btn @click="decrement">
      -
    </v-btn>
    <span class="count">
      {{ count }}
    </span>
    <v-btn @click="increment">
      +
    </v-btn>
    <div>
      <input type="text" v-model="exampleText">
      <v-btn @click="pushArr">Submit</v-btn>
    </div>
    <div>
      {{ texts }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { computed } from '@nuxtjs/composition-api'
import counterStore from '@/utils/store.ts'

export default defineComponent({
  layout: 'page',
  setup () {
    const counter = counterStore()
    const count = computed(() => counter.count)

    const texts = computed(() => counter.arr)

    const exampleText = ref('')

    return {
      exampleText,
      texts,
      pushArr: counter.addArr,
      count,
      increment: counter.increment,
      decrement: counter.decrement
    }
  }
})
</script>
