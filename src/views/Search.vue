<!-- src/views/Search.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <!-- Search Header -->
      <header class="max-w-4xl mx-auto pt-8 px-4">
        <router-link 
          to="/" 
          class="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </router-link>
  
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for anything..."
            class="w-full px-6 py-4 text-lg bg-white text-black rounded-full shadow-lg border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors pr-12"
            @input="handleSearch"
          >
          <span 
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            :class="{ 'cursor-pointer hover:text-gray-600': searchQuery }"
            @click="clearSearch"
          >
            <svg v-if="searchQuery" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
  
        <!-- Search Filters -->
        <div class="flex flex-wrap gap-2 mt-4">
          <button 
            v-for="(filter, index) in filters" 
            :key="index"
            @click="toggleFilter(filter)"
            class="px-4 py-2 rounded-full text-sm transition-all duration-200"
            :class="[
              filter.active 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ filter.name }}
          </button>
        </div>
      </header>
  
      <!-- Search Results -->
      <main class="max-w-4xl mx-auto mt-8 px-4">
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p class="text-gray-600 mt-4">Searching...</p>
        </div>
  
        <div v-else-if="searchQuery && results.length" class="space-y-4">
          <div 
            v-for="(result, index) in results" 
            :key="index"
            class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 class="text-lg font-semibold text-gray-800">{{ result.title }}</h3>
            <p class="text-gray-600 mt-2">{{ result.description }}</p>
            <div class="flex items-center mt-4 text-sm">
              <span class="text-purple-600">{{ result.category }}</span>
              <span class="mx-2 text-gray-300">•</span>
              <span class="text-gray-500">{{ result.date }}</span>
            </div>
          </div>
        </div>
  
        <div v-else-if="searchQuery" class="text-center py-12">
          <div class="bg-white rounded-xl shadow-md p-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3 class="text-lg font-semibold text-gray-800">No results found</h3>
            <p class="text-gray-600 mt-2">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        </div>
  
        <div v-else class="text-center py-12">
          <div class="bg-white rounded-xl shadow-md p-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3 class="text-lg font-semibold text-gray-800">Start searching</h3>
            <p class="text-gray-600 mt-2">
              Enter your search query above to find what you're looking for
            </p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Search',
    data() {
      return {
        searchQuery: '',
        loading: false,
        filters: [
          { name: 'All', active: true },
          { name: 'Products', active: false },
          { name: 'Articles', active: false },
          { name: 'Categories', active: false },
          { name: 'Tags', active: false }
        ],
        results: [
          {
            title: 'Example Search Result 1',
            description: 'This is a sample search result description that demonstrates how results will appear.',
            category: 'Products',
            date: '2 days ago'
          },
          {
            title: 'Example Search Result 2',
            description: 'Another sample search result with different content to show variety in the results.',
            category: 'Articles',
            date: '1 week ago'
          }
        ]
      }
    },
    methods: {
      handleSearch() {
        if (this.searchQuery.length > 2) {
          this.loading = true;
          // Simulate API call
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      },
      clearSearch() {
        this.searchQuery = '';
        this.results = [];
      },
      toggleFilter(filter) {
        if (filter.name === 'All') {
          this.filters.forEach(f => f.active = false);
          filter.active = true;
        } else {
          const allFilter = this.filters.find(f => f.name === 'All');
          allFilter.active = false;
          filter.active = !filter.active;
          
          // If no filters are active, activate 'All'
          if (!this.filters.some(f => f.active)) {
            allFilter.active = true;
          }
        }
        this.handleSearch();
      }
    },
    mounted() {
      // Focus the search input when the component mounts
      this.$nextTick(() => {
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      });
    }
  }
  </script>