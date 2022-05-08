<template>
  <div class="max-w-5xl mx-auto p-4">
      <AppHero />
      <div
        class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl mt-12"
      >
        <div class="grid w-full grid-cols-1 gap-6 mx-auto md:grid-cols-2">
          <BaseCard v-for="course in courses" :key="course.title" :item="course"/>
        </div>
      </div>

  </div>
</template>

<script>
import { ref, onMounted, useStore, computed } from '@nuxtjs/composition-api'
import { getDocsFromFirestore } from '~/plugins/firebase'
export default {
  setup() {
    const courses = ref([])

    onMounted(() => {
      getDocsFromFirestore('courses').then((docs) => {
        courses.value = docs
      })
    })

    return {
      courses
    }

  }
}
</script>
