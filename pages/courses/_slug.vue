<template>
  <div class="max-w-3xl mx-auto my-12">
    <iframe
      v-if="item.videos"
      :src="`https://www.youtube.com/embed/${ytLink}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="w-full aspect-video mb-2 rounded-lg"
    ></iframe>

    <h1 class="text-4xl font-bold">{{ item.title }}</h1>

    <div class="flex items-center flex-wrap mb-6 space-x-4">
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <!-- Heroicon name: solid/briefcase -->
        <svg
          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
          <path
            d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
          />
        </svg>
        Beginner
      </div>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <!-- Heroicon name: solid/calendar -->
        <svg
          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
        Course duration: 1 Hour
      </div>
    </div>

    <p>{{ item.description }}</p>
  </div>
</template>

<script>
import { onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { getYtlinkId } from '@/composables/useUtils.js'

export default {
  setup() {
    const { params } = useContext()

    const item = ref({})
    const ytLink = ref('')

    onMounted(() => {
      ytLink.value = getYtlinkId(params.value.item.videos[0].url)
      item.value = params.value.item

      console.log(item.value)
    })

    return {
      item,
      ytLink,
    }
  },
}
</script>
ann
<style></style>
