<template>
  <div class="p-6">
    <!-- <img
      class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
      src="https://source.unsplash.com/random?code"
      alt="blog"
    /> -->

    <iframe
      :src="`https://www.youtube.com/embed/${ytLinkId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="w-full aspect-video mb-2 rounded-lg"
    ></iframe>

    <h1
      class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl"
    >
      {{ item.title }}
    </h1>
    <p class="mx-auto text-base leading-relaxed text-gray-500">
      {{ item.description }}
    </p>

    <div class="mt-4">
      <a
        href="#"
        class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
        title="read more"
      >
        Read More »
      </a>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
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

    return { ytLink, ytLinkId }
  },
}
</script>

<style></style>
