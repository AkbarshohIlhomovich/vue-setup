<!-- src/views/NotFound.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
          <div class="absolute -right-16 -top-16 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-60" />
          <div class="absolute -left-16 -bottom-16 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60" />
  
          <!-- Main content -->
          <div class="relative">
            <h1 class="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
              404
            </h1>
            
            <div class="space-y-4 mb-8">
              <h2 class="text-2xl font-semibold text-gray-800">
                Oops! Page not found
              </h2>
              <p class="text-gray-600 max-w-md mx-auto">
                The page you're looking for seems to have wandered off into the digital wilderness.
                Redirecting you home in {{ countdown }} seconds...
              </p>
            </div>
  
            <!-- Interactive elements -->
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
              <router-link 
                to="/"
                class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl w-full md:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Go Home</span>
              </router-link>
              
              <button 
                @click="this.$project.successToast(`Something went wrong!`)"
                class="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full hover:border-gray-300 transition-all duration-200 w-full md:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
                <span>Try Again</span>
              </button>
              
              <router-link 
                to="/search"
                class="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full hover:border-gray-300 transition-all duration-200 w-full md:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Search</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    data() {
      return {
        countdown: 15
      }
    },
    mounted() {
      this.startCountdown();
    },
    methods: {
      startCountdown() {
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(timer);
            this.$router.push('/');
          }
        }, 1000);
      },
      reloadPage() {
        window.location.reload();
      }
    }
  }
  </script>
  
  <style scoped>
  .bg-clip-text {
    -webkit-background-clip: text;
  }
  </style>