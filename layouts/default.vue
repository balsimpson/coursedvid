<template>
  <div class="flex flex-col min-h-screen ">
    <div
      class=" transition-colors duration-200  border-b"
    >
      <div
        class="flex flex-col items-center justify-between max-w-5xl p-4 mx-auto text-white sm:space-x-4 sm:flex-row"
      >
        <!-- logo -->
        <NuxtLink to="/" class="h-24">
          <img src="/logo_transparent.png" alt="episodez logo" class="w-32" />
        </NuxtLink>
      </div>
    </div>
    <div class="flex-grow">
      <Nuxt />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted, useStore, computed } from '@nuxtjs/composition-api'
import { signOutUser } from '~/plugins/firebase'
export default {
  setup(props, { emit }) {
    const currentTheme = ref('dark')
    let searchByTitle

    const { state } = useStore()

    const user = computed(() => {
      return state.user
    })

    const lists = computed(() => {
      return state.lists
    })

    const fuzzy = (items, key) => {
      //let searchByCategory = fuzzy(list, 'category');

      return (query) => {
        let words = query.toLowerCase().split(' ')

        return items.filter((item) => {
          let normalizedTerm = item[key].toLowerCase()

          return words.every((word) => {
            return normalizedTerm.indexOf(word) > -1
          })
        })
      }
    }

    onMounted(() => {
      // searchByTags = fuzzy(lists.value, 'tags')
      searchByTitle = fuzzy(lists.value, 'title')
      // searchByDescription = fuzzy(lists.value, 'description')
      // if (localStorage.theme == 'dark') {
      //   currentTheme.value = 'dark'
      // } else {
      //   if (
      //     localStorage.theme != 'light' &&
      //     window.matchMedia('(prefers-color-scheme: dark)').matches
      //   ) {
      //     currentTheme.value = 'dark'
      //     localStorage.theme = currentTheme.value
      //   } else {
      //     currentTheme.value = localStorage.theme
      //   }
      // }
      // if (
      //   localStorage.theme ||
      //   (!("theme" in localStorage) &&
      //     window.matchMedia("(prefers-color-scheme: dark)").matches)
      // ) {
      //   isDarkMode.value = true;
      //   localStorage.theme = isDarkMode.value;
      // } else {
      //   isDarkMode.value = localStorage.theme;
      // }
      // console.log("dafault-localStorage.theme", localStorage.theme);
    })

    const clickHandler = (val) => {
      currentTheme.value = val
      // console.log('clicked', val)
    }

    return { currentTheme, clickHandler, user, signOutUser, searchByTitle }
  },
}
</script>

<style></style>
