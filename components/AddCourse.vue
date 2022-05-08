<template>
  <div>
    <div>
      <div class="md:grid md:grid-cols-3 md:gap-6 md:divide-x">
        <div class="md:col-span-1 mt-6">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-bold leading-6 text-gray-900">Course</h3>
            <p class="mt-1 text-sm text-gray-600">
              Information about the course.
            </p>
          </div>
        </div>
        <div class="md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Name of the course
                  </label>
                  <div class="mt-1">
                    <input
                      v-model="courseTitle"
                      type="text"
                      class="mt-1 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Javascript for beginners"
                    />
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    A descriptive title for the course
                  </p>
                </div>

                <div>
                  <label
                    for="about"
                    class="block text-sm font-medium text-gray-700"
                  >
                    About the course
                  </label>
                  <div class="mt-1">
                    <textarea
                      v-model="courseDescription"
                      rows="3"
                      class="px-2 py-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="This course is about..."
                    ></textarea>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    Brief description of the course.
                  </p>
                </div>

                <!-- cover photo -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Cover photo
                  </label>
                  <div
                    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                  >
                    <div class="space-y-1 text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div class="flex text-sm text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200"></div>
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1 mt-6">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Videos</h3>
            <p class="mt-1 text-sm text-gray-600">
              Add the relevant videos to the course.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div v-for="video in videos" :key="video.title">
            <div class="text-xl font-bold">{{ video.title }}</div>
            <div class="italic">{{ video.url }}</div>
          </div>
          <form action="#" method="POST">
            <div class="">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6">
                  <div class="col-span-6">
                    <div class="col-span-6">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Video Title
                      </label>
                      <div class="mt-1">
                        <input
                          v-model="videoTitle"
                          type="text"
                          class="mt-1 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Javascript for beginners"
                        />
                      </div>
                    </div>

                    <div class="col-span-6 my-2">
                      <label
                        for="email-address"
                        class="block text-sm font-medium text-gray-700"
                        >YouTube Video URL</label
                      >
                      <input
                        v-model="videoUrl"
                        type="url"
                        class="mt-1 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        placeholder="https://www.youtube.com/watch?v=W6NZfCO5SIk"
                      />
                    </div>

                    <button
                      type="submit"
                      @click.prevent="addVideo"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Video
                    </button>
                  </div>

                  <div class="col-span-6 sm:col-span-3 mt-12">
                    <label
                      for="country"
                      class="block text-sm font-medium text-gray-700"
                      >Category</label
                    >
                    <select
                      v-model="category"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="px-4 py-3 bg-gray-50 sm:px-6">
      <div class="col-span-6 mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <div class="mt-1">
          <input
            v-model="tags"
            type="text"
            class="mt-1 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            placeholder="Javascript, HTML, CSS"
          />
        </div>
      </div>
      <button
        @click.prevent="handleSubmit"
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import { addDocToFirestore } from '@/plugins/firebase'
export default {
  setup() {
    const courseTitle = ref('')
    const videos = ref([])
    const videoTitle = ref('')
    const videoUrl = ref('')
    const courseDescription = ref('')
    const category = ref('Beginner')
    const tags = ref('')

    const addVideo = async () => {
      videos.value.push({
        title: videoTitle.value,
        url: videoUrl.value,
      })
      videoTitle.value = ''
      videoUrl.value = ''

      console.log(videos.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      let data = {
        title: courseTitle.value,
        description: courseDescription.value,
        category: category.value,
				tags: tags.value.split(','),
        videos: videos.value,
        createdAt: new Date(),
      }

			let res = await addDocToFirestore('courses', data)

      courseTitle.value = ''
      courseDescription.value = ''
      videos.value = []
      category.value = 'Beginner'

      console.log(res)
    }

    return {
      courseTitle,
      videos,
      videoTitle,
      videoUrl,
      courseDescription,
      category,
			tags,
      addVideo,
      handleSubmit,
    }
  },
}
</script>

<style></style>
