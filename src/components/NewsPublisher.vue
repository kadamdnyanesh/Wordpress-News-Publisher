<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">
          Publish News to WordPress
        </h1>

        <!-- JSON Input Section -->
        <div class="mb-8 p-4 bg-gray-50 rounded-xl">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Import JSON Data
          </h3>
          <div class="space-y-2">
            <textarea
              v-model="jsonInput"
              rows="10"
              placeholder="Paste your JSON data here"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
            ></textarea>
            <div class="flex space-x-4">
              <button
                @click="importJsonData"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Import JSON
              </button>
              <button
                @click="exportJsonData"
                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>
            <div
              v-if="jsonMessage"
              :class="[
                'p-3 rounded-lg text-sm font-medium',
                jsonMessage.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200',
              ]"
            >
              {{ jsonMessage.text }}
            </div>
          </div>
        </div>

        <form @submit.prevent="publishNews" class="space-y-8">
          <!-- Title -->
          <div class="space-y-2">
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 text-left"
              >Title</label
            >
            <input
              type="text"
              id="title"
              v-model="article.title"
              required
              placeholder="Enter news title"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <!-- Slug -->
          <div class="space-y-2">
            <label
              for="slug"
              class="block text-sm font-medium text-gray-700 text-left"
              >Slug</label
            >
            <input
              type="text"
              id="slug"
              v-model="article.slug"
              required
              placeholder="Enter URL slug"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <!-- Date -->
          <div class="space-y-2">
            <label
              for="date"
              class="block text-sm font-medium text-gray-700 text-left"
              >Publish Date</label
            >
            <input
              type="datetime-local"
              id="date"
              v-model="formattedDate"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <!-- Format -->
          <div class="space-y-2">
            <label
              for="format"
              class="block text-sm font-medium text-gray-700 text-left"
              >Format</label
            >
            <select
              id="format"
              v-model="article.format"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="standard">Standard</option>
              <option value="aside">Aside</option>
              <option value="gallery">Gallery</option>
              <option value="link">Link</option>
              <option value="image">Image</option>
              <option value="quote">Quote</option>
              <option value="status">Status</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="chat">Chat</option>
            </select>
          </div>

          <!-- Content Section -->
          <div class="space-y-2">
            <label
              for="content"
              class="block text-sm font-medium text-gray-700 text-left"
              >Content</label
            >
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <textarea
                id="content"
                v-model="article.content"
                required
                rows="10"
                placeholder="Enter news content"
                class="w-full px-4 py-2.5 border-0 focus:ring-0 focus:outline-none resize-y"
              ></textarea>
            </div>
          </div>

          <!-- SEO Section -->
          <div class="bg-gray-50 rounded-xl p-6 space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 text-left">
              SEO Settings
            </h3>

            <!-- SEO Title -->
            <div class="space-y-2">
              <label
                for="seoTitle"
                class="block text-sm font-medium text-gray-700 text-left"
                >SEO Title</label
              >
              <input
                type="text"
                id="seoTitle"
                v-model="article.meta._yoast_wpseo_title"
                required
                placeholder="Enter SEO title"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <!-- Meta Description -->
            <div class="space-y-2">
              <label
                for="metaDescription"
                class="block text-sm font-medium text-gray-700 text-left"
                >Meta Description</label
              >
              <textarea
                id="metaDescription"
                v-model="article.meta._yoast_wpseo_metadesc"
                required
                placeholder="Enter meta description"
                rows="3"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
              ></textarea>
            </div>

            <!-- Focus Keyword -->
            <div class="space-y-2">
              <label
                for="focusKeyword"
                class="block text-sm font-medium text-gray-700 text-left"
                >Focus Keyword</label
              >
              <input
                type="text"
                id="focusKeyword"
                v-model="article.meta._yoast_wpseo_focuskw"
                required
                placeholder="Enter focus keyword"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <!-- News Keywords -->
            <div class="space-y-2">
              <label
                for="newsKeywords"
                class="block text-sm font-medium text-gray-700 text-left"
                >News Keywords</label
              >
              <input
                type="text"
                id="newsKeywords"
                v-model="article.meta._yoast_wpseo_news_keywords"
                required
                placeholder="Enter news keywords (comma separated)"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <!-- Canonical URL -->
            <div class="space-y-2">
              <label
                for="canonical"
                class="block text-sm font-medium text-gray-700 text-left"
                >Canonical URL</label
              >
              <input
                type="text"
                id="canonical"
                v-model="article.meta._yoast_wpseo_canonical"
                required
                placeholder="Enter canonical URL"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <!-- Robots Index -->
            <div class="space-y-2">
              <label
                for="robotsIndex"
                class="block text-sm font-medium text-gray-700 text-left"
                >Robots Index</label
              >
              <select
                id="robotsIndex"
                v-model="article.meta._yoast_wpseo_robots_index"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="1">Index</option>
                <option value="0">No Index</option>
              </select>
            </div>

            <!-- Robots Follow -->
            <div class="space-y-2">
              <label
                for="robotsFollow"
                class="block text-sm font-medium text-gray-700 text-left"
                >Robots Follow</label
              >
              <select
                id="robotsFollow"
                v-model="article.meta._yoast_wpseo_robots_follow"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="1">Follow</option>
                <option value="0">No Follow</option>
              </select>
            </div>

            <!-- Cornerstone Content -->
            <div class="space-y-2">
              <label
                for="cornerstone"
                class="block text-sm font-medium text-gray-700 text-left"
                >Cornerstone Content</label
              >
              <select
                id="cornerstone"
                v-model="article.meta._yoast_wpseo_cornerstone"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option :value="'false'">No</option>
                <option :value="'true'">Yes</option>
              </select>
            </div>

            <!-- Primary Category -->
            <div class="space-y-2">
              <label
                for="primaryCategory"
                class="block text-sm font-medium text-gray-700 text-left"
                >Primary Category</label
              >
              <input
                type="number"
                id="primaryCategory"
                v-model="article.meta._yoast_wpseo_primary_category"
                required
                placeholder="Enter primary category ID"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="isPublishing"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {{ isPublishing ? "Publishing..." : "Publish News" }}
          </button>

          <div
            v-if="message"
            :class="[
              'p-4 rounded-lg text-sm font-medium',
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200',
            ]"
          >
            {{ message.text }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { postNewsToWordPress } from "../services/wordpressService";
import newsData from "../assets/newsData.json";

// Function to get current local time in ISO format
const getCurrentLocalTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

// Format the initial date in the newsData
const formattedNewsData = {
  ...newsData,
  date: getCurrentLocalTime(),
};

const article = ref(formattedNewsData);

// Computed property for the date input
const formattedDate = computed({
  get: () => {
    if (!article.value.date) return "";
    const date = new Date(article.value.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },
  set: (newValue) => {
    if (newValue) {
      const date = new Date(newValue);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      article.value.date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
  },
});

const isPublishing = ref(false);
const message = ref(null);

const publishNews = async () => {
  isPublishing.value = true;
  message.value = null;

  try {
    const result = await postNewsToWordPress(article.value);

    if (result.success) {
      message.value = {
        type: "success",
        text: `News published successfully! View it here: ${result.link}`,
      };
      // Reset form with current local time
      article.value = {
        title: "",
        slug: "",
        status: "publish",
        date: getCurrentLocalTime(),
        format: "standard",
        content: "",
        meta: {
          _yoast_wpseo_title: "",
          _yoast_wpseo_metadesc: "",
          _yoast_wpseo_focuskw: "",
          _yoast_wpseo_focuskw_text_input: "",
          _yoast_wpseo_canonical: "",
          _yoast_wpseo_robots_index: "1",
          _yoast_wpseo_robots_follow: "1",
          _yoast_wpseo_cornerstone: "false",
          _yoast_wpseo_news_keywords: "",
          _yoast_wpseo_primary_category: 1,
        },
      };
    } else {
      message.value = {
        type: "error",
        text: `Failed to publish: ${result.error}`,
      };
    }
  } catch (error) {
    message.value = {
      type: "error",
      text: `An error occurred: ${error.message}`,
    };
  } finally {
    isPublishing.value = false;
  }
};

const messageClass = computed(() => {
  return [
    "mt-4 p-3 rounded-md",
    message.value?.type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700",
  ];
});

// JSON input handling
const jsonInput = ref(JSON.stringify(newsData, null, 2));
const jsonMessage = ref(null);

const importJsonData = () => {
  try {
    const parsedData = JSON.parse(jsonInput.value);
    article.value = {
      ...parsedData,
      date: parsedData.date || getCurrentLocalTime(),
    };
    jsonMessage.value = {
      type: "success",
      text: "JSON data imported successfully!",
    };
  } catch (error) {
    jsonMessage.value = {
      type: "error",
      text: `Invalid JSON: ${error.message}`,
    };
  }
};

const exportJsonData = () => {
  try {
    jsonInput.value = JSON.stringify(article.value, null, 2);
    jsonMessage.value = {
      type: "success",
      text: "Current data exported to JSON!",
    };
  } catch (error) {
    jsonMessage.value = {
      type: "error",
      text: `Error exporting data: ${error.message}`,
    };
  }
};
</script>

<style>
/* Remove CKEditor styles */
</style>
