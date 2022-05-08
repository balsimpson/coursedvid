<template>
  <div class="p-6">
    <!-- <img
      class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
      src="https://source.unsplash.com/random?code"
      alt="blog"
    /> -->

    <div class="p-6">
      <!-- <img class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src="/images/jscrashcourse.jpg"
            alt="blog"> -->
      <iframe
        :src="`https://www.youtube.com/embed/${ytLinkId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full aspect-video mb-2 rounded-lg"
      ></iframe>

      <h2
        class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase"
      >
        Programming: JavaScript
      </h2>

      <div class="text-blue-600 mb-8 text-2xl font-semibold leading-none tracking-tighter lg:text-3xl">{{ item.title }}</div>


      <div class="mt-4">
        <NuxtLink
          :to="{
            name: 'courses-slug',
            params: {
              slug: createSlug(item.title, item.uid),
              item: item,
            },
          }"
          class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
        >
          Go to course page »
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import { createSlug } from '@/composables/useUtils.js'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup(props, { emit }) {
    const ytLink = ref(props.item.videos[0].url)

    const ytLinkId = computed(() => {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = ytLink.value.match(regExp)

      return match && match[2].length === 11 ? match[2] : null
    })

    return { ytLink, ytLinkId, createSlug }
  },
}
</script>

<style></style>
